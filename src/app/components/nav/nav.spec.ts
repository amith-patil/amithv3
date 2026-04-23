import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Nav } from './nav';

describe('Nav Component', () => {
  let component: Nav;
  let fixture: ComponentFixture<Nav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nav]
    }).compileComponents();

    fixture = TestBed.createComponent(Nav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update offsetFlag based on scroll', () => {
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
    component.getScrollHeight(new Event('scroll'));
    expect(component.offsetFlag).toBeFalsy();

    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    component.getScrollHeight(new Event('scroll'));
    expect(component.offsetFlag).toBeTruthy();
  });

  it('should set offsetFlag to true on mouseEnter', () => {
    component.offsetFlag = false;
    component.onMouseEnter();
    expect(component.offsetFlag).toBeTruthy();
  });

  it('should verify mouseLeave functionality based on scrollY', () => {
    component.offsetFlag = true;
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
    component.onMouseLeave();
    expect(component.offsetFlag).toBeFalsy();

    component.offsetFlag = true;
    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    component.onMouseLeave();
    expect(component.offsetFlag).toBeTruthy();
  });
});
