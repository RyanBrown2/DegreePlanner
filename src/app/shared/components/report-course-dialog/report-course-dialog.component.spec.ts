import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCourseDialogComponent } from './report-course-dialog.component';

describe('ReportCourseDialogComponent', () => {
  let component: ReportCourseDialogComponent;
  let fixture: ComponentFixture<ReportCourseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCourseDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
