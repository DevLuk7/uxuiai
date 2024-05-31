import { Injectable, inject, signal } from '@angular/core';
import { AIModelService } from './ai-model.service';

@Injectable({ providedIn: 'root' })
export class GenerateService {
  private readonly model = inject(AIModelService);

  readonly isLoading = signal(false);

  async generateComponent(prompt: string) {
    this.isLoading.set(true);
    let returnVal = '';

    try {
      returnVal = await this.model.generateContent(prompt);
    } catch (error) {
      console.error(error);
    }

    this.isLoading.set(false);

    return returnVal;
  }

  async generatePage(prompt: string) {
    this.isLoading.set(true);
    let returnVal = '';

    try {
      returnVal = await this.model.generateContent(prompt);
    } catch (error) {
      console.error(error);
    }

    this.isLoading.set(false);

    return returnVal;
  }
}
