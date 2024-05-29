import { Injectable, inject } from '@angular/core';
import { VertexAI, getGenerativeModel } from '@angular/fire/vertexai-preview';

@Injectable({ providedIn: 'root' })
export class GenerateService {
  private vertexAI = inject(VertexAI);

  model = getGenerativeModel(this.vertexAI, {
    model: 'gemini-1.5-flash-preview-0514',
  });

  async generateComponent(prompt: string) {
    const result = await this.model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Generate frontend component using HTML and TailwindCSS. Description: ${prompt}. Output should be a JSON format and html should be returned value. Check url of images and links. I want to show image to user.`,
            },
          ],
        },
      ],
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
    return JSON.parse(text).html;
  }
}
