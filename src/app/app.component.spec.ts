import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  provideExperimentalZonelessChangeDetection,
  signal, Type,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppTestComponent>;
  let reactiveFixture: ReactiveComponentFixture<AppTestComponent>;
  let component: AppTestComponent;

  const initFixture = async () => {
    fixture = TestBed.createComponent<AppTestComponent>(AppTestComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    await fixture.whenRenderingDone();
    fixture.detectChanges();
  }

  const initReactiveFixture = async () => {
    reactiveFixture = ReactiveComponentFixture.createComponent<AppTestComponent>(AppTestComponent);
    fixture = reactiveFixture.originalFixture;
    component = fixture.componentInstance;
    await reactiveFixture.originalFixture.whenStable();
    reactiveFixture.detectChanges();
  }

  const getContent = () => {
    return fixture.debugElement.query(By.css('#content')).nativeElement.innerText;
  }

  const getSignalContent = () => {
    return fixture.debugElement.query(By.css('#signalContent')).nativeElement.innerText;
  }

  const getCounter = () => {
    return fixture.debugElement.query(By.css('#counter')).nativeElement.innerText;
  }

  const getCounterBtn = () => {
    return fixture.debugElement.query(By.css('#counterBtn')).nativeElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, AppTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    }).compileComponents();

    await initFixture();
  });

  it('should show content', () => {
    expect(getContent()).toEqual('content');
  });

  it('should change input', () => {
    expect(getContent()).toEqual('content');
    component.content = 'changedContent';
    fixture.changeDetectorRef.detectChanges()
    expect(getContent()).toEqual('changedContent');
  });

  it('should change input of viewChild', () => {
    expect(getContent()).toEqual('content');
    component.appRoot!.content = 'changedContent';
    fixture.detectChanges();
    expect(getContent()).toEqual('changedContent');
  });

  it('should change input when marking as dirty', () => {
    expect(getContent()).toEqual('content');
    component.content = 'changedContent';
    component.cdr.markForCheck();
    fixture.detectChanges();
    expect(getContent()).toEqual('changedContent');
  })

  it('should update counter after click', () => {
    expect(getCounter()).toEqual('0');
    getCounterBtn().click();
    fixture.detectChanges();
    expect(getCounter()).toEqual('1');
  })

  it('should update signal content', () => {
    expect(getSignalContent()).toEqual('signalContent');
    component.signalContent.set('signalContentChanged');
    fixture.detectChanges();
    expect(getSignalContent()).toEqual('signalContentChanged');
  })
});


export class ReactiveComponentFixture<T> {

  private readonly internalFixture : ComponentFixture<T>

  constructor(fixtureToWrap: ComponentFixture<T>) {
    this.internalFixture = fixtureToWrap;
  }

  static createComponent<T>(component: Type<T>) : ReactiveComponentFixture<T> {
    return new ReactiveComponentFixture<T>(TestBed.createComponent(component));
  }

  get originalFixture() : ComponentFixture<T> {
    return this.internalFixture;
  }

  detectChanges() : void {
    this.internalFixture.changeDetectorRef.markForCheck();
    this.internalFixture.detectChanges();
  }

}

@Component({
  selector: 'app-test',
  template: `
    <app-root
        [content]="content"
        [signalContent]="signalContent()"
    ></app-root>
  `,
  standalone: true,
  imports:[AppComponent],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppTestComponent {

  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  content: string = 'content';
  wrapperContentSignal: WritableSignal<string> = signal<string>(this.content);
  signalContent: WritableSignal<string> = signal<string>('signalContent');

  @ViewChild(AppComponent)
  appRoot?: AppComponent;

}
