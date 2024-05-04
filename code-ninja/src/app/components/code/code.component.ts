import { Component, OnInit, ViewChild } from '@angular/core';
import { encode, decode } from 'js-base64';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
} from '@materia-ui/ngx-monaco-editor';
import { CommunicationService } from 'src/app/store';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit {
  constructor(private communicationService: CommunicationService) {}

  @ViewChild(MonacoEditorComponent, { static: false })
  $js = this.$('#js');
  $html = this.$('#html');
  $css = this.$('#css');
  editorOptionsHtml: MonacoEditorConstructionOptions = {
    language: 'html', // java, javascript, python, csharp, html, markdown, ruby
    theme: 'vs-dark', // vs, vs-dark, hc-black
    automaticLayout: true,
  };
  editorOptionsJS: MonacoEditorConstructionOptions = {
    language: 'javascript', // java, javascript, python, csharp, html, markdown, ruby
    theme: 'vs-dark', // vs, vs-dark, hc-black
    automaticLayout: true,
  };
  editorOptionsCSS: MonacoEditorConstructionOptions = {
    language: 'css', // java, javascript, python, csharp, html, markdown, ruby
    theme: 'vs-dark', // vs, vs-dark, hc-black
    automaticLayout: true,
  };
  htmlCode = '';
  jsCode = '';
  cssCode = '';
  getHtmlCode() {
    return this.htmlCode;
  }
  getJSCode() {
    return this.jsCode;
  }
  getCssCode() {
    return this.cssCode;
  }

  ngOnInit(): void {
    this.$js = this.$('#js');
    this.$html = this.$('#html');
    this.$css = this.$('#css');
    this.$css?.addEventListener('input', this.update.bind(this));
    this.$js?.addEventListener('input', this.update.bind(this));
    this.$html?.addEventListener('input', this.update.bind(this));

    // this.init();
    this.communicationService.downloadEvent$.subscribe(() => {
      this.handleDownloadEvent();
    });
    this.communicationService.shareEvent$.subscribe(() => {
      this.handleShareEvent();
    });
  }

  handleDownloadEvent() {
    const zip = new JSZip();
    const html = this.getHtmlCode();
    const css = this.getCssCode();
    const js = this.getJSCode();
    const newHtml = this.createHtml({ html, css, js });
    zip.file('index.html', newHtml);
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      saveAs(blob, 'code-ninja-file.zip');
    });
  }

  handleShareEvent() {
    console.log('necesito compartir el codigo');
  }

  $(selector: string): HTMLInputElement | null {
    return document.querySelector(selector);
  }

  init() {
    const { pathname } = window.location;

    const [rawHtml, rawCss, rawJs] = pathname.slice(6).split('%7C');

    console.log(pathname);
    console.log(pathname.slice(6).split('%7C'));

    console.log(rawHtml);
    console.log(rawCss);
    console.log(rawJs);

    const html = rawHtml ? decode(`${rawHtml}`) : '';
    const css = rawCss ? decode(`${rawCss}`) : '';
    const js = rawJs ? decode(`${rawJs}`) : '';

    if (this.$html && this.$css && this.$js) {
      this.$html.value = html;
      this.$css.value = css;
      this.$js.value = js;
    }

    const newHtml = this.createHtml({ html, css, js });
    this.$('iframe')?.setAttribute('srcdoc', `${newHtml}`);
  }

  update() {
    const html = this.getHtmlCode();
    const js = this.getJSCode();
    const css = this.getCssCode();

    const hashedCode = `${encode(`${html}`)}|${encode(`${css}`)}|${encode(
      `${js}`
    )}`;

    // window.history.replaceState(null, '', `code/${hashedCode}`);

    const newHtml = this.createHtml({ html, css, js });
    this.$('iframe')?.setAttribute('srcdoc', `${newHtml}`);
  }

  createHtml({ html, js, css }: { html: any; js: any; css: any }) {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
        ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
        ${js}
      </script>
      </body>
    </html>
    `;
  }
}
