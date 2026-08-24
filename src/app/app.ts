import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Nav } from './components/nav/nav';
import { Socials } from './components/socials/socials';
import { Splashscreen } from './components/splashscreen/splashscreen';
import { AssetLoaderService } from './services/asset-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Nav, Socials, Splashscreen],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('amithv3');

  splashShown = signal(true);
  fading = signal(false);

  constructor(
    private assetLoader: AssetLoaderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      this.initLoader();
    }
  }

  private async initLoader(): Promise<void> {
    const startTime = Date.now();
    const minAnimationDuration = 2200; // Duration of the logo draw stroke animation

    // Await actual asset downloading across all JSONs, fonts, media, and window load
    await this.assetLoader.loadAll();

    // Ensure the animation has completed at least one full draw cycle
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minAnimationDuration - elapsedTime);

    setTimeout(() => {
      this.fading.set(true);

      setTimeout(() => {
        this.splashShown.set(false);
      }, 700);
    }, remainingTime);
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

