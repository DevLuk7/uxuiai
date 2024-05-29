import { Component, input, viewChild, ElementRef } from '@angular/core';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss',
})
export class CodeEditorComponent {
  readonly code = input('code');

  readonly editorContainer = viewChild<ElementRef>('editorContainer');
  private editor!: monaco.editor.IStandaloneCodeEditor;

  ngAfterViewInit() {
    this.editor = monaco.editor.create(this.editorContainer()?.nativeElement, {
      value: this.code(),
      language: 'html',
      theme: 'vs',
    });
  }
}
