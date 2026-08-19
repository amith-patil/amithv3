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
        this.renderer.addClass(this.el.nativeElement, 'is-visible');
        const video = this.el.nativeElement.querySelector('video');
        if (video) {
          video.muted = true;
          video.play().catch((err: any) => console.log("Video play blocked or failed:", err));
        }

        observer.unobserve(this.el.nativeElement);
      }
    }, {
      threshold: 0.50,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(this.el.nativeElement);
  }
}