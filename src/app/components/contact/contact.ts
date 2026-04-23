import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  socialLinks = [
    { name: 'GitHub', url: 'https://github.com/amith-patil', icon: 'fa-github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/amithpatil', icon: 'fa-linkedin' },
    { name: 'Instagram', url: 'https://instagram.com/yourindianfriendo', icon: 'fa-instagram' }
  ];
}
