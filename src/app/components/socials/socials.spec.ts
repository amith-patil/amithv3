import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Socials } from './socials';

describe('Socials Component', () => {
  let component: Socials;
  let fixture: ComponentFixture<Socials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Socials]
    }).compileComponents();

    fixture = TestBed.createComponent(Socials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize social links', () => {
    expect(component.socialLinks.length).toBe(3);
    expect(component.socialLinks[0].name).toBe('GitHub');
  });

  it('should update isScrolled on window scroll', () => {
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
    component.onWindowScroll();
    expect(component.isScrolled).toBeTruthy();

    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    component.onWindowScroll();
    expect(component.isScrolled).toBeFalsy();
  });
});
