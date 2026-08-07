import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';


interface MarqueeItem {
  name: string;
  icon: string;
  safeIcon?: SafeHtml; // The '?' means it starts as undefined and gets filled later
}

interface careerStages {
  title: string;
  company: string;
  period: string;
  points: string[];
  tools: string[];
}

@Component({
  selector: 'app-career',
  imports: [CommonModule, RevealDirective],
  templateUrl: './career.html',
  styleUrl: './career.css',
})
export class Career {

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) { }

  activeStageIndex: number | null = 0;

  toggleStage(index: number) {
    this.activeStageIndex = this.activeStageIndex === index ? null : index;
  }

  careerStages: careerStages[] = [];

  items: MarqueeItem[] = [];

  ngOnInit() {
    // Process the items once the component initializes
    this.http.get<any[]>('./career-stages.json').subscribe(data => {
      this.careerStages = data;
    });
    this.http.get<MarqueeItem[]>('./marquee-items.json').subscribe(data => {
      this.items = data.map(item => ({
        ...item,
        safeIcon: this.sanitizer.bypassSecurityTrustHtml(item.icon)
      }))
    })
  }
}
