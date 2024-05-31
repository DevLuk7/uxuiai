import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preview-html',
  standalone: true,
  imports: [],
  templateUrl: './preview-html.component.html',
  styleUrl: './preview-html.component.scss',
})
export class PreviewHtmlComponent {
  readonly code = input();

  private readonly domSanitizer = inject(DomSanitizer);

  srcdoc = computed(() =>
    this.domSanitizer.bypassSecurityTrustHtml(`
      ${this.code()}
      <script src="https://cdn.tailwindcss.com"></script>
    `)
  );
}
