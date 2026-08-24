import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface AssetItem {
  url: string;
  type: 'json' | 'media';
}

@Injectable({
  providedIn: 'root'
})
export class AssetLoaderService {
  readonly progress = signal<number>(0);
  readonly isLoaded = signal<boolean>(false);

  private readonly assets: AssetItem[] = [
    { url: '/skills.json', type: 'json' },
    { url: '/career-stages.json', type: 'json' },
    { url: '/about-paragraphs.json', type: 'json' },
    { url: '/marquee-items.json', type: 'json' },
    { url: '/about.webm', type: 'media' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async loadAll(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      this.progress.set(100);
      this.isLoaded.set(true);
      return;
    }

    const totalItems = this.assets.length + 2; // +1 for fonts, +1 for window load
    let completedItems = 0;

    const updateProgress = () => {
      completedItems++;
      const currentPct = Math.round((completedItems / totalItems) * 100);
      this.progress.set(currentPct);
    };

    // 1. Fonts readiness
    const fontsPromise = (async () => {
      try {
        if ('fonts' in document) {
          await Promise.race([
            document.fonts.ready,
            new Promise((resolve) => setTimeout(resolve, 3000))
          ]);
        }
      } catch (_) {
        // Fallback gracefully
      } finally {
        updateProgress();
      }
    })();

    // 2. Window / DOM complete
    const windowLoadPromise = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        updateProgress();
        resolve();
      } else {
        const onLoad = () => {
          window.removeEventListener('load', onLoad);
          updateProgress();
          resolve();
        };
        window.addEventListener('load', onLoad);
        // Safety timeout
        setTimeout(() => {
          window.removeEventListener('load', onLoad);
          updateProgress();
          resolve();
        }, 4000);
      }
    });

    // 3. Static JSON and Media Assets
    const assetPromises = this.assets.map(async (asset) => {
      try {
        if (asset.type === 'media') {
          await new Promise<void>((resolve) => {
            const video = document.createElement('video');
            video.src = asset.url;
            video.preload = 'auto';

            const onReady = () => {
              cleanup();
              resolve();
            };

            const onError = () => {
              cleanup();
              resolve(); // Don't block loading on media error
            };

            const cleanup = () => {
              video.removeEventListener('loadeddata', onReady);
              video.removeEventListener('canplay', onReady);
              video.removeEventListener('error', onError);
            };

            video.addEventListener('loadeddata', onReady);
            video.addEventListener('canplay', onReady);
            video.addEventListener('error', onError);

            // Timeout safety for video
            setTimeout(onReady, 4000);
          });
        } else {
          await fetch(asset.url, { cache: 'force-cache' }).catch(() => {});
        }
      } catch (_) {
        // Fallback
      } finally {
        updateProgress();
      }
    });

    await Promise.all([fontsPromise, windowLoadPromise, ...assetPromises]);

    this.progress.set(100);
    this.isLoaded.set(true);
  }
}
