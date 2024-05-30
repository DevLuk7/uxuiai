import {
  Component,
  ElementRef,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  type = input();

  private readonly render = inject(Renderer2);
  private readonly elemRef = inject(ElementRef);

  constructor() {
    effect(() => {
      this.render.addClass(
        this.elemRef.nativeElement,
        `btn-${this.type() || 'primary'}`
      );
    });
  }
}
