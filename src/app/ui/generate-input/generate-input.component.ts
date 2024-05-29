import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-generate-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './generate-input.component.html',
  styleUrl: './generate-input.component.scss',
})
export class GenerateInputComponent {
  readonly form = new FormGroup({
    prompt: new FormControl(''),
  });

  submit = output<string>();
}
