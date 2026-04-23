import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';

describe('Hero Component', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero]
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update scrollY on window scroll', () => {
    // Mock window scrollY
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    
    // Dispatch scroll event handler manually since we are unit testing the logic
    component.onWindowScroll();
    
    expect(component.scrollY).toBe(75); // 100 * 0.75
  });
});
