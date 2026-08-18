import { AfterViewInit, Component, ElementRef, HostListener, Inject, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';
import { RevealDirective } from '../../directives/reveal';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-hero',
  imports: [RevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements AfterViewInit, OnDestroy {
  scrollY = 0;
  logoX = 0;
  logoY = 0;

  private rafPending = false;
  private mouseLerpRaf: number | null = null;
  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;
  private readonly LERP = 0.06;

  constructor(private ngZone: NgZone, private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        const loop = () => {
          this.currentX += (this.targetX - this.currentX) * this.LERP;
          this.currentY += (this.targetY - this.currentY) * this.LERP;
          const dx = Math.abs(this.currentX - this.logoX);
          const dy = Math.abs(this.currentY - this.logoY);
          if (dx > 0.05 || dy > 0.05) {
            this.ngZone.run(() => {
              this.logoX = this.currentX;
              this.logoY = this.currentY;
            });
          }
          this.mouseLerpRaf = requestAnimationFrame(loop);
        };
        this.mouseLerpRaf = requestAnimationFrame(loop);
      });
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.ngZone.runOutsideAngular(() => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      // Max parallax offset ±28px
      this.targetX = ((event.clientX - cx) / cx) * 28;
      this.targetY = ((event.clientY - cy) / cy) * 28;
    });
  }

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
    if (this.mouseLerpRaf !== null) cancelAnimationFrame(this.mouseLerpRaf);
  }
}
