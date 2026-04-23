import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Nav } from './components/nav/nav';
import { Socials } from './components/socials/socials';
import { Splashscreen } from './components/splashscreen/splashscreen';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Nav, Socials, Splashscreen],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('amithv3');

  splashShown = signal(true);
  fading = signal(false);

  constructor() {
    setTimeout(() => {
      this.fading.set(true);

      setTimeout(() => {
        this.splashShown.set(false);
      }, 700);
    }, 2500);
  }

  shouldShowSplash() {
    return this.splashShown();
  }

  isFading() {
    return this.fading();
  }

  showGlobalUI() {
    return !this.splashShown() || this.fading();
  }
}
