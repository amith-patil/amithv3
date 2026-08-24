import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',

})
export class Nav {
  offsetFlag = true;
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  scrollToTop(event: Event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.closeMobileMenu();
  }

  @HostListener('window:scroll', ['$event']) getScrollHeight(event: any) {
    if (window.scrollY > 100) {
      this.offsetFlag = false;
    } else this.offsetFlag = true;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.offsetFlag = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (window.scrollY > 100) {
      this.offsetFlag = false;
    }
  }

  @HostListener('window:keydown.escape') onEscapeKey() {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}
