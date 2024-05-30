import {
  Component,
  ElementRef,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';

@Component({
  selector: 'button[appButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  variant = input();

  private readonly render = inject(Renderer2);
  private readonly elemRef = inject(ElementRef);

  constructor() {
    effect(() => {
      this.render.addClass(
        this.elemRef.nativeElement,
        `btn-${this.variant() || 'primary'}`
      );
    });
  }
}
