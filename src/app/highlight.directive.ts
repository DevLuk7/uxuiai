import { AfterViewInit, Directive } from '@angular/core';
import hljs from 'highlight.js/lib/core';

@Directive({ standalone: true, selector: '[highlight]' })
export class HighlightDirective implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    hljs.highlightAll();
  }
}
