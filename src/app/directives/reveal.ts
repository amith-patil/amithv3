import { Directive, ElementRef, Renderer2, afterNextRender } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {

    afterNextRender(() => {
      this.initObserver();
    });
  }

  private initObserver() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Add your visibility class
        this.renderer.addClass(this.el.nativeElement, 'is-visible');
        const video = this.el.nativeElement.querySelector('video');
        if (video) {
          // muted is required for play() to work without user interaction
          video.muted = true;
          video.play().catch((err: any) => console.log("Video play blocked or failed:", err));
        }

        // Stop watching once the animation is triggered
        observer.unobserve(this.el.nativeElement);
      }
    }, {
      threshold: 0.30, // Trigger when 30% is visible
      rootMargin: '0px 0px -50px 0px' // Slightly offset so it feels more natural
    });

    observer.observe(this.el.nativeElement);
  }
}