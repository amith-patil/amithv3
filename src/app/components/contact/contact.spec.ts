import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';

describe('Contact Component', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    (window as any).IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    await TestBed.configureTestingModule({
      imports: [Contact]
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with social links', () => {
    expect(component.socialLinks.length).toBe(3);
    expect(component.socialLinks[0].name).toBe('GitHub');
  });
});
