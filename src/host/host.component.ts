import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild, ElementRef,
  inject,
  Input, Renderer2,
  TemplateRef, ViewChild
} from '@angular/core';
import {ChildComponent} from '../child/child.component';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-host',
  imports: [
    ChildComponent,
    NgTemplateOutlet
  ],
  templateUrl: './host.component.html',
  standalone: true,
  styleUrl: './host.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HostComponent {

  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  renderer: Renderer2 = inject(Renderer2);

  @ViewChild('clickCounterBtn')
  buttonRef?: ElementRef<HTMLButtonElement>;

  @ContentChild('template')
  template?: TemplateRef<any>;

  clickCounter: number = 0;

  incrementClickCounter() : void {
    this.clickCounter++;
    this.cdr.markForCheck();
  }

  ngAfterViewInit() : void {
    this.renderer.listen(this.buttonRef!.nativeElement, 'click', () => {
      this.clickCounter++;
    })
  }

}
