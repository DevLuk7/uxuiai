import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { FirebaseAppModule } from '@angular/fire/app';
import { VertexAI, getGenerativeModel } from '@angular/fire/vertexai-preview';
import { RouterOutlet } from '@angular/router';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import javascript from 'highlight.js/lib/languages/javascript';
import { HighlightDirective } from './highlight.directive';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FirebaseAppModule, HighlightDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private vertexAI = inject(VertexAI);
  private domSanitizer = inject(DomSanitizer);

  model = getGenerativeModel(this.vertexAI, {
    model: 'gemini-1.5-flash-preview-0514',
  });

  generatedCode = '';
  isLoadingGeneratedCode = false;

  readonly publicPrompts = [
    {
      label: 'CTA',
      prompt: 'Generate a section previewing a product.',
    },
    {
      label: 'Pricing section',
      prompt: 'Generate a pricing section with three tiers.',
    },
    {
      label: 'Hero',
      prompt:
        'Generate a hero section with a nice purple gradient background and a round CTA button.',
    },
    {
      label: 'Search bar',
      prompt: 'Generate a search bar with round corners and purple button.',
    },
    {
      label: 'Navbar',
      prompt:
        'Generate a light full-width navbar with three links and a rounded purple CTA button.',
    },
    {
      label: 'Product Preview',
      prompt: 'Generate a section previewing a product.',
    },
  ];

  constructor() {
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('javascript', javascript);

    this.generatedCode = JSON.parse(
      '{"html": "\u003cdiv class=\\"bg-white rounded-lg shadow-md p-6\\"\u003e\\n  \u003cimg src=\\"https://dummyimage.com/300x200/000/fff&text=Product+Image\\" alt=\\"Product Image\\" class=\\"w-full h-48 object-cover rounded-lg mb-4\\"\u003e\\n  \u003ch2 class=\\"text-xl font-bold text-gray-800 mb-2\\"\u003eProduct Name\u003c/h2\u003e\\n  \u003cp class=\\"text-gray-600 mb-4\\"\u003eLorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna.\u003c/p\u003e\\n  \u003cdiv class=\\"flex items-center justify-between\\"\u003e\\n    \u003cp class=\\"text-lg font-semibold text-gray-800\\"\u003e$19.99\u003c/p\u003e\\n    \u003cbutton class=\\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline\\"\u003eView Details\u003c/button\u003e\\n  \u003c/div\u003e\\n\u003c/div\u003e"}\n'
    ).html;

    setTimeout(() => {
      hljs.highlightAll();
    });
  }

  async generateTailwindCSSConfig() {
    const result = await this.model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: 'Generate JSON file whitch represets config for TailwindCSS. Configuration should have theme property with colors and fonts.',
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
    const text = response.text();

    return '\n{\n  '.concat(
      JSON.stringify(JSON.parse(text), null, 2).replace('{\n', '').trimStart()
    );
  }

  generate() {
    this.isLoadingGeneratedCode = true;
    this.generateTailwindCSSConfig().then((text) => {
      this.generatedCode = text;
      hljs.highlightAll();
      this.isLoadingGeneratedCode = false;
    });

    setTimeout(() => {
      hljs.highlightAll();
    });
  }

  generateWithPrompt(prompt: string) {
    this.isLoadingGeneratedCode = true;
    this.generateComponent(prompt).then((text) => {
      this.generatedCode = text;
      hljs.highlightAll();
      this.isLoadingGeneratedCode = false;
    });

    setTimeout(() => {
      hljs.highlightAll();
    });
  }

  async generateComponent(prompt: string) {
    const result = await this.model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Generate frontend component using HTML and TailwindCSS. Description: ${prompt}. Output should be a JSON format and html should be returned value.`,
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

  getSrcdoc() {
    return this.domSanitizer.bypassSecurityTrustHtml(`
      <div>
        <div class="absolute w-full min-h-full flex justify-center items-center">
          ${this.generatedCode}
        </div>
      </div>
      <script src="https://cdn.tailwindcss.com"></script>
    `);
  }
}
