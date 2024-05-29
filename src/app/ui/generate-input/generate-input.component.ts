import { Component, inject, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GenerateInputService } from './gemerate-input.service';

@Component({
  selector: 'app-generate-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './generate-input.component.html',
  styleUrl: './generate-input.component.scss',
})
export class GenerateInputComponent {
  private readonly generateInputService = inject(GenerateInputService);
  readonly form = this.generateInputService.form;

  submit = output<string>();

  onSubmit() {
    this.submit.emit(this.generateInputService.form.controls.prompt.value!);
    console.log('test ss');
  }
}
