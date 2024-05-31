import { Injectable } from '@angular/core';

@Injectable()
export abstract class AIModelService {
  readonly systemInstructions = `You are code Assistant and you generate code in HTML and CSS with the library TailwidCSS. If you want to add <img> tag, you can use atributte src from website https://picsum.photos/.
    Responds format is a JSON.
    "html" property return a string with HTML content of element html <body>
    "suggestions" property should return array of string containing helpful suggestions.
    `;

  async generateContent(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      resolve(prompt);
    });
  }
}
