import { ComponentFixture, TestBed } from '@angular/core/testing';
import { About } from './about';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('About Component', () => {
  let component: About;
  let fixture: ComponentFixture<About>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    // Mock IntersectionObserver
    (window as any).IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    await TestBed.configureTestingModule({
      imports: [About],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    
    // We expect the HTTP request to be made on ngOnInit (which is called by detectChanges)
    // but not immediately injected unless we get HttpTestingController first.
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // Flush the initial request to satisfy the afterEach verify
    const req = httpTestingController.expectOne('./skills.json');
    req.flush([]);
  });

  it('should fetch skills on init', () => {
    const mockSkills = [{ title: 'Angular', description: 'Framework', icon: 'angular', delay: '0s' }];
    const req = httpTestingController.expectOne('./skills.json');
    expect(req.request.method).toEqual('GET');
    req.flush(mockSkills);
    expect(component.skills).toEqual(mockSkills);
  });
});
