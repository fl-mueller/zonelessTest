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
export class AppComponent {

}
