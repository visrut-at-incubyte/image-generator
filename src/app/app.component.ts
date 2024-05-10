import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import * as htmlToImage from 'html-to-image';
import { HighlightAuto, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HighlightAuto],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        themePath: 'assets/styles/solarized-dark.css',
      },
    },
  ],
})
export class AppComponent {
  @ViewChild('post') public post!: ElementRef<HTMLDivElement>;

  code = `<html>

<head>
  <title>My first HTML page</title>
</head>

<body>
  <p>Hello World!</p>
</body>

</html>`;

  saveImage() {
    htmlToImage
      .toPng(this.post.nativeElement, {
        backgroundColor: 'inherit',
      })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
