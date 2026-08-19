import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-socials',
  imports: [CommonModule],
  templateUrl: './socials.html',
  styleUrl: './socials.css',
})
export class Socials {
  socialLinks = [
    { name: 'GitHub', url: 'https://github.com/amith-patil', icon: 'fa-github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/amithpatil', icon: 'fa-linkedin' },
    { name: 'Instagram', url: 'https://instagram.com/yourindianfriendo', icon: 'fa-instagram' }
  ];

  isScrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }
}
