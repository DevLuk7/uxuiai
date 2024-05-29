import { Injectable, inject, signal } from '@angular/core';
import { VertexAI, getGenerativeModel } from '@angular/fire/vertexai-preview';

@Injectable({ providedIn: 'root' })
export class GenerateService {
  private vertexAI = inject(VertexAI);

  readonly model = getGenerativeModel(this.vertexAI, {
    model: 'gemini-1.5-flash-preview-0514',
  });

  readonly isLoading = signal(false);

  async generateComponent(prompt: string) {
    this.isLoading.set(true);
    let returnVal = '';

    try {
      const result = await this.model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Here is a description for component:  ${prompt}.`,
              },
            ],
          },
        ],
        systemInstruction: {
          role: 'system',
          parts: [
            {
              text: 'You a robot witch generate code. You generate HTML code with TailwindCSS classes.',
            },
            {
              text: 'Check url of images, if on send request to server you have response status 404 do not use this image. Use https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=2215&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D as a placeholder for the image URL.',
            },
            {
              text: 'Output should be a JSON format and html should be returned value.',
            },
            {
              text: 'Add second parameter to JSON file called suggestions. It should be an array of strings. Suggestions should be tips for the generated component. Suggestion should be a object with 2 parameters: title and message.',
            },
            {
              text: 'Remember about adding paddings, spaces and center elements. Buttons and titles should have minimum 1 rem spaces from other elements.',
            },
            {
              text: 'Background behaind generated component is white. Add some shadow or other elements to make component visible.',
            },
            {
              text: 'Add accesibility to generated component. Use aria-labels and alt attributes for images.',
            },
          ],
        },
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
        },
      });
      const response = result.response;
      const text: any = response.text();
      returnVal = JSON.parse(text);
    } catch (error) {
      console.error(error);
    }

    this.isLoading.set(false);

    return returnVal;
  }
}
