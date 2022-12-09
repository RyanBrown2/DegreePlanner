import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface ReportCourseData {
	title: boolean,
	prereqs: boolean
}

@Component({
  selector: 'app-report-course-dialog',
  templateUrl: './report-course-dialog.component.html',
  styleUrls: ['./report-course-dialog.component.scss']
})
export class ReportCourseDialogComponent implements OnInit {

  constructor(
		@Inject(MAT_DIALOG_DATA) public data: ReportCourseData
	) { }

  ngOnInit(): void {
  }

}
