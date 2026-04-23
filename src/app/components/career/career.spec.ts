import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Career } from './career';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

describe('Career Component', () => {
  let component: Career;
  let fixture: ComponentFixture<Career>;
  let httpTestingController: HttpTestingController;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    (window as any).IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    await TestBed.configureTestingModule({
      imports: [Career],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Career);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    sanitizer = TestBed.inject(DomSanitizer);
    fixture.detectChanges(); // Will trigger ngOnInit
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
    // Flush pending requests triggered by detectChanges()
    const reqStages = httpTestingController.expectOne('./career-stages.json');
    reqStages.flush([]);
    const reqMarquee = httpTestingController.expectOne('./marquee-items.json');
    reqMarquee.flush([]);
  });

  it('should fetch career stages and marquee items on init', () => {
    const mockCareerStages = [
      { title: 'Dev', company: 'ABC', period: '2020-2021', points: [], tools: [] }
    ];
    const mockMarqueeItems = [
      { name: 'Angular', icon: '<svg></svg>' }
    ];

    const reqStages = httpTestingController.expectOne('./career-stages.json');
    expect(reqStages.request.method).toEqual('GET');
    reqStages.flush(mockCareerStages);

    const reqMarquee = httpTestingController.expectOne('./marquee-items.json');
    expect(reqMarquee.request.method).toEqual('GET');
    reqMarquee.flush(mockMarqueeItems);

    expect(component.careerStages).toEqual(mockCareerStages);
    expect(component.items.length).toBe(1);
    expect(component.items[0].name).toBe('Angular');
    expect(component.items[0].safeIcon).toBeDefined();
  });
});
