import { Component, inject, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GenerateInputService } from './gemerate-input.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-generate-input',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './generate-input.component.html',
  styleUrl: './generate-input.component.scss',
})
export class GenerateInputComponent {
  private readonly generateInputService = inject(GenerateInputService);
  readonly form = this.generateInputService.form;

  submit = output<string>();

  onSubmit() {
    this.submit.emit(this.generateInputService.form.controls.prompt.value!);
  }
}
