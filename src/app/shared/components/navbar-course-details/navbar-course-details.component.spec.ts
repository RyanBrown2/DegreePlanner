import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCourseDetailsComponent } from './navbar-course-details.component';

describe('NavbarCourseDetailsComponent', () => {
  let component: NavbarCourseDetailsComponent;
  let fixture: ComponentFixture<NavbarCourseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarCourseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
