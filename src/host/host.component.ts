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

/**
 * This component should be viewed, as provided by a library
 */
@Component({
  selector: 'app-host',
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './host.component.html',
  standalone: true,
  styleUrl: './host.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HostComponent {

  @ContentChild('template')
  template?: TemplateRef<any>;

}
