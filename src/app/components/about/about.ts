import { CommonModule } from '@angular/common';
import { Component, afterNextRender, ElementRef, Renderer2 } from '@angular/core';
import { RevealDirective } from '../../directives/reveal';
import { HttpClient } from '@angular/common/http';

interface Skill {
  title: string;
  description: string;
  icon: string;
  delay: string;
}

@Component({
  selector: 'app-about',
  imports: [CommonModule, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  skills: Skill[] = [];
  aboutParagraphs: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Skill[]>('./skills.json').subscribe(data => {
      this.skills = data;
    });
    this.http.get<string[]>('./about-paragraphs.json').subscribe(data => {
      this.aboutParagraphs = data;
    });
  }
}
