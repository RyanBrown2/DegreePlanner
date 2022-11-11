import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeManagerComponent } from './degree-manager.component';

describe('DegreeManagerComponent', () => {
  let component: DegreeManagerComponent;
  let fixture: ComponentFixture<DegreeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreeManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
