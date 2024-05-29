import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FirebaseAppModule } from '@angular/fire/app';
import { RouterOutlet } from '@angular/router';
import { CodeEditorComponent } from './feature-preview/ui/code-editor/code-editor.component';
import { PreviewHtmlComponent } from './feature-preview/ui/preview-html/preview-html.component';
import { GenerateService } from './feature-generate/generate.service';
import { NotificationsService } from './feature-notifications/notifications.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FirebaseAppModule,
    CodeEditorComponent,
    PreviewHtmlComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly generateService = inject(GenerateService);
  private readonly notifications = inject(NotificationsService);

  readonly form = new FormGroup({
    prompt: new FormControl(''),
  });

  generatedCode = JSON.parse(
    '{"html": "\u003cdiv class=\\"bg-white rounded-lg shadow-md p-6\\"\u003e\\n  \u003cdiv class=\\"flex items-center mb-4\\"\u003e\\n    \u003cimg src=\\"https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=2215&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D\\" alt=\\"Product Image\\" class=\\"w-24 h-24 object-cover rounded-md mr-4\\"\u003e\\n    \u003cdiv\u003e\\n      \u003ch2 class=\\"text-xl font-bold text-gray-800\\"\u003eProduct Name\u003c/h2\u003e\\n      \u003cp class=\\"text-gray-600\\"\u003eShort product description\u003c/p\u003e\\n    \u003c/div\u003e\\n  \u003c/div\u003e\\n  \u003cdiv class=\\"flex justify-between items-center\\"\u003e\\n    \u003cp class=\\"text-lg font-medium text-gray-800\\"\u003e$19.99\u003c/p\u003e\\n    \u003ca href=\\"https://www.example.com/product\\" class=\\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md\\"\u003eView Product\u003c/a\u003e\\n  \u003c/div\u003e\\n\u003c/div\u003e"}\n'
  ).html;

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

  generateWithPrompt(prompt: string) {
    this.form.controls.prompt.setValue(prompt);
    this.generateService.generateComponent(prompt).then((obj: any) => {
      console.log(obj);
      obj.suggestions.forEach((suggestion: any) => {
        this.notifications.show(suggestion);
      });

      this.generatedCode = obj.html;
    });
  }

  constructor() {
    this.notifications.show({
      title: 'title 1',
      message: 'message 1',
    });

    this.notifications.show({
      title: 'title 2',
      message: 'message 2',
    });
  }
}
