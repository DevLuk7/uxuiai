import { Component, inject } from '@angular/core';
import { GenerateInputComponent } from '../../ui/generate-input/generate-input.component';
import { GenerateService } from '../../feature-generate/generate.service';
import { CardComponent } from '../../ui/card/card.component';
import { PreviewHtmlComponent } from '../../feature-preview/ui/preview-html/preview-html.component';
import { CodeEditorComponent } from '../../feature-preview/ui/code-editor/code-editor.component';
import { SpinnerComponent } from '../../ui/spinner/spinner.component';

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

  generatedCode = '';

  submit(prompt: string) {
    this.generateService
      .generateComponent(
        `
    Generate a website using TailwindCSS. Add html structure to website including head and body ${prompt}.`
      )
      .then((result: any) => {
        console.log(result);

        this.generatedCode = result?.html;
      });
  }
}
