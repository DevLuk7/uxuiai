import { Injectable, inject } from '@angular/core';
import { VertexAI, getGenerativeModel } from '@angular/fire/vertexai-preview';
import { AIModelService } from './ai-model.service';

@Injectable()
export class AIModelGeminiService extends AIModelService {
  private vertexAI = inject(VertexAI);

  readonly model = getGenerativeModel(this.vertexAI, {
    model: 'gemini-1.5-flash-preview-0514',
  });

  override async generateContent(prompt: string) {
    return this.model
      .generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        systemInstruction: {
          role: 'system',
          parts: [
            {
              text: this.systemInstructions,
            },
            // {
            //   text: 'Check url of images, if on send request to server you have response status 404 do not use this image. Use https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=2215&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D as a placeholder for the image URL.',
            // },
            // {
            //   text: 'Output should be a JSON format and html should be returned value.',
            // },
            // {
            //   text: 'Add second parameter to JSON file called suggestions. It should be an array of strings. Suggestions should be tips for the generated component. Suggestion should be a object with 2 parameters: title and message. Suggestions should be related to the generated component.',
            // },
            // {
            //   text: 'Add paddings, spaces and center elements. Buttons and titles should have minimum 1 rem spaces from other elements.',
            // },
            // {
            //   text: 'Background behaind generated component is white. Add some shadow or elements to contrast to make component visible.',
            // },
            // {
            //   text: 'Add accesibility to generated component. Use aria-labels and alt attributes for images.',
            // },
            // {
            //   text: 'Add next parameters to JSON file caled type. Parametr should be a type of component witch you created.',
            // },
            // {
            //   text: `Use Tailwind's responsive utilities (like 'sm:', 'md:', 'lg:', etc.) to ensure that the product preview looks good on different screen sizes.`,
            // },
            // {
            //   text: 'Use atomic design principles to create components. Atomic design is a methodology for creating design systems. There are five distinct levels in atomic design: atoms, molecules, organisms, templates, and pages. Add to JSON file a parameter called atomicDesignLevel. It should be a string with one of the following values: atom, molecule, organism, template, or page.',
            // },
            // {
            //   text: `Add background of button from colors: "{
            //       "Option 1": {
            //         "Primary": "#F26419",
            //         "Secondary": "#2F86A6"
            //       },
            //       "Option 2": {
            //         "Primary": "#004777",
            //         "Secondary": "#F7B32B"
            //       },
            //       "Option 3": {
            //         "Primary": "#5D3FD3",
            //         "Secondary": "#E9DAC1"
            //       },
            //       "Option 4": {
            //         "Primary": "#2E8B57",
            //         "Secondary": "#D2B48C"
            //       }
            //     }"`,
            // },
          ],
        },
        generationConfig: {
          temperature: 1,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
        },
      })
      .then((result) => {
        const response = result.response;
        const text: any = response.text();
        return JSON.parse(text);
      });
  }
}
