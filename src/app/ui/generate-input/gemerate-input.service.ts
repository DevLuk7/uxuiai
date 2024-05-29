import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class GenerateInputService {
  readonly form = new FormGroup({
    prompt: new FormControl(''),
  });
}
