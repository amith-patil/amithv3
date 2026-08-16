import { Component, HostListener } from '@angular/core';
import { RevealDirective } from '../../directives/reveal';


@Component({
  selector: 'app-hero',
  imports: [RevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  scrollY = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // We update the scroll position. 
    // Using a factor (like 0.5) controls the speed of the parallax.
    this.scrollY = window.scrollY * 0.5;
  }
}
