import { Component, HostListener, NgZone, OnDestroy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal';


@Component({
  selector: 'app-hero',
  imports: [RevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnDestroy {
  scrollY = 0;
  private rafPending = false;

  constructor(private ngZone: NgZone) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.rafPending) return;
    this.rafPending = true;

    // Run outside Angular zone so change detection isn't triggered on every
    // animation frame — we manually update only once per rAF tick.
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        const target = window.scrollY * 0.5;
        this.ngZone.run(() => {
          this.scrollY = target;
        });
        this.rafPending = false;
      });
    });
  }

  ngOnDestroy() {
    this.rafPending = false;
  }
}
