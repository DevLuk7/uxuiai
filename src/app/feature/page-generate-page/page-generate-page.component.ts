import { Component, inject } from '@angular/core';
import { GenerateInputComponent } from '../../ui/generate-input/generate-input.component';
import { GenerateService } from '../../feature-generate/generate.service';
import { CardComponent } from '../../ui/card/card.component';
import { PreviewHtmlComponent } from '../../feature-preview/ui/preview-html/preview-html.component';
import { CodeEditorComponent } from '../../feature-preview/ui/code-editor/code-editor.component';
import { SpinnerComponent } from '../../ui/spinner/spinner.component';
import { GenerateInputService } from '../../ui/generate-input/generate-input.service';

@Component({
  selector: 'app-page-generate-page',
  standalone: true,
  imports: [
    GenerateInputComponent,
    CardComponent,
    PreviewHtmlComponent,
    CodeEditorComponent,
    SpinnerComponent,
  ],
  templateUrl: './page-generate-page.component.html',
  styleUrl: './page-generate-page.component.scss',
})
export class PageGeneratePageComponent {
  readonly generateService = inject(GenerateService);
  private readonly generateInputService = inject(GenerateInputService);

  readonly example = JSON.parse(
    '{\n  "html": "<!DOCTYPE html>\\n<html lang=\\"en\\">\\n<head>\\n    <meta charset=\\"UTF-8\\">\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\">\\n    <title>Portfolio</title>\\n    <link href=\\"https://cdn.jsdelivr.net/npm/tailwindcss@2.0.3/dist/tailwind.min.css\\" rel=\\"stylesheet\\">\\n</head>\\n<body class=\\"bg-gray-900 text-white\\">\\n    <header class=\\"p-6 text-center bg-gray-800 shadow-md\\">\\n        <h1 class=\\"text-3xl font-bold\\">User Portfolio</h1>\\n        <nav class=\\"mt-4\\">\\n            <a href=\\"/\\" class=\\"text-lg mx-2 hover:text-gray-300\\">Home</a>\\n            <a href=\\"/about\\" class=\\"text-lg mx-2 hover:text-gray-300\\">About</a>\\n        </nav>\\n    </header>\\n    <main class=\\"p-6\\">\\n        <section class=\\"mb-8\\">\\n            <h2 class=\\"text-2xl font-semibold mb-4\\">Portfolio</h2>\\n            <div class=\\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\\">\\n                <div class=\\"bg-gray-800 p-4 rounded-lg shadow-md\\">\\n                    <img src=\\"https://picsum.photos/300/200\\" alt=\\"Project 1\\" class=\\"w-full h-40 object-cover rounded-lg mb-2\\">\\n                    <h3 class=\\"text-xl font-bold\\">Project 1</h3>\\n                    <p class=\\"mt-2 text-gray-400\\">Description of the project 1.</p>\\n                </div>\\n                <div class=\\"bg-gray-800 p-4 rounded-lg shadow-md\\">\\n                    <img src=\\"https://picsum.photos/300/200\\" alt=\\"Project 2\\" class=\\"w-full h-40 object-cover rounded-lg mb-2\\">\\n                    <h3 class=\\"text-xl font-bold\\">Project 2</h3>\\n                    <p class=\\"mt-2 text-gray-400\\">Description of the project 2.</p>\\n                </div>\\n                <div class=\\"bg-gray-800 p-4 rounded-lg shadow-md\\">\\n                    <img src=\\"https://picsum.photos/300/200\\" alt=\\"Project 3\\" class=\\"w-full h-40 object-cover rounded-lg mb-2\\">\\n                    <h3 class=\\"text-xl font-bold\\">Project 3</h3>\\n                    <p class=\\"mt-2 text-gray-400\\">Description of the project 3.</p>\\n                </div>\\n            </div>\\n        </section>\\n    </main>\\n    <footer class=\\"p-6 text-center bg-gray-800\\">\\n        <p class=\\"text-gray-400\\">&copy; 2023 User\'s Name. All rights reserved.</p>\\n    </footer>\\n</body>\\n</html>",\n  "suggestions": [\n    "Consider adding a contact form or a contact information section.",\n    "Use TailwindCSS classes to improve the responsiveness of the website on different devices.",\n    "Add more projects to the portfolio section or consider adding categories to better organize the work.",\n    "Enhance SEO by adding meta descriptions and keywords.",\n    "Incorporate social media links to connect visitors to other platforms."\n  ]\n}'
  );

  generatedCode = this.example.html;

  constructor() {
    this.generateInputService.form.controls.prompt.setValue(
      'Theme of website should be dark. Website should contain 2 subpages. On main page is here section with portfolio of user.'
    );
  }

  submit(prompt: string) {
    if (typeof prompt !== 'string') {
      return;
    }

    this.generateService
      .generatePage(
        `
    Generate a website using TailwindCSS. Add html structure to website including head and body ${prompt}.`
      )
      .then((result: any) => {
        console.log(result);

        this.generatedCode = result?.html;
      });
  }
}
