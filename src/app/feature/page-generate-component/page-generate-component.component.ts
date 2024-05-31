import { Component, inject } from '@angular/core';
import { CodeEditorComponent } from '../../feature-preview/ui/code-editor/code-editor.component';
import { PreviewHtmlComponent } from '../../feature-preview/ui/preview-html/preview-html.component';
import { CardComponent } from '../../ui/card/card.component';
import { GenerateInputComponent } from '../../ui/generate-input/generate-input.component';
import { PillComponent } from '../../ui/pill/pill.component';
import { SpinnerComponent } from '../../ui/spinner/spinner.component';
import { GenerateService } from '../../feature-generate/generate.service';
import { GenerateInputService } from '../../ui/generate-input/generate-input.service';
import { Notification } from '../../feature-notifications/notification';

@Component({
  selector: 'app-page-generate-component',
  standalone: true,
  imports: [
    CodeEditorComponent,
    PreviewHtmlComponent,
    PillComponent,
    GenerateInputComponent,
    CardComponent,
    SpinnerComponent,
  ],
  templateUrl: './page-generate-component.component.html',
  styleUrl: './page-generate-component.component.scss',
})
export class PageGenerateComponentComponent {
  readonly generateService = inject(GenerateService);
  readonly generateInputService = inject(GenerateInputService);

  readonly example = JSON.parse(
    '{\n  "html": "<div class=\\"bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto\\">\\n  <img src=\\"https://picsum.photos/300\\" alt=\\"Product Image\\" class=\\"w-full h-48 object-cover rounded\\">\\n  <h2 class=\\"text-xl font-semibold mt-4\\">Product Name</h2>\\n  <p class=\\"text-gray-700 my-2\\">This is a brief description of the product that highlights its features and benefits. It\'s crafted to attract buyers and give them a quick overview of what the product offers.</p>\\n  <div class=\\"mt-4\\">\\n    <span class=\\"text-lg font-bold text-green-600\\">\\n      $99.99\\n    </span>\\n    <button class=\\"bg-blue-500 text-white py-2 px-4 rounded ml-4 hover:bg-blue-700 transition duration-200\\">\\n      Buy Now\\n    </button>\\n  </div>\\n</div>",\n  "suggestions": [\n    "Add more images to create a gallery for better product visualization.",\n    "Include customer reviews or ratings to build trust.",\n    "Add a call-to-action button for quick checkout or more info.",\n    "Consider adding details like product dimensions, weight, and materials."\n  ]\n}'
  );

  generatedCode = this.example.html;

  suggestions: Notification[] = this.example.suggestions;

  readonly publicPrompts = [
    {
      label: 'CTA',
      prompt: 'Section previewing a product.',
    },
    {
      label: 'Pricing section',
      prompt: 'Pricing section with three tiers.',
    },
    {
      label: 'Hero',
      prompt:
        'Hero section with a nice purple gradient background and a round CTA button.',
    },
    {
      label: 'Search bar',
      prompt: 'Search bar with round corners and purple button.',
    },
    {
      label: 'Navbar',
      prompt:
        'Light full-width navbar with three links and a rounded purple CTA button.',
    },
    {
      label: 'Product Preview',
      prompt: 'Section previewing a product.',
    },
    {
      label: 'Random',
      prompt: 'Random element which i can use on website.',
    },
  ];

  generateWithPrompt(prompt: string) {
    this.generateInputService.form.controls.prompt.setValue(prompt);
    this.generateService.generateComponent(prompt).then((obj: any) => {
      this.suggestions = obj.suggestions;

      this.generatedCode = obj.html;
    });
  }

  submit(e: string) {
    if (typeof e === 'string') {
      this.generateWithPrompt(e);
    }
  }
}
