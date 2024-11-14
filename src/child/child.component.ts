import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  standalone: true,
  styleUrl: './child.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChildComponent implements AfterViewInit{

  private readonly renderer: Renderer2 = inject(Renderer2);

  clickCounter: number = 0;

  @ViewChild('buttonRef')
  buttonRef?: ElementRef<HTMLButtonElement>

  ngAfterViewInit(): void {
    // rely on zone.js to trigger change detection
    this.renderer.listen(this.buttonRef!.nativeElement, 'click', () => {
      this.clickCounter++;
    })
  }


}
