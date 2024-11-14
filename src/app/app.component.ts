import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef, inject,
  input,
  Input,
  InputSignal, NgZone,
  Renderer2,
  ViewChild
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChildComponent} from '../child/child.component';
import {HostComponent} from '../host/host.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildComponent, HostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements AfterViewInit{
  title = 'zonelessTest';

  private readonly renderer = inject(Renderer2);
  private readonly zone: NgZone = inject(NgZone);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild('rendererCounterBtn')
  buttonRef?: ElementRef<HTMLButtonElement>

  @Input()
  content: string = 'content';

  signalContent: InputSignal<string> = input<string>('signalContent');

  clickCounter: number = 0;

  onClick(event: MouseEvent): void {
    this.clickCounter++;
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.clickCounter = 25;
      this.cdr.markForCheck();
    })

    this.renderer.listen(this.buttonRef?.nativeElement, 'click', () => {
        this.clickCounter++;
        this.cdr.markForCheck();
    })
  }
}
