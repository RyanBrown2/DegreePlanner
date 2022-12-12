import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface ReportCourseData {
	title: boolean,
	prereqs: boolean
}

export class CourseReport {
	constructor(
		public id: string,
		public title: boolean,
		public prereqs: boolean,
	) {}
}

@Component({
  selector: 'app-report-course-dialog',
  templateUrl: './report-course-dialog.component.html',
  styleUrls: ['./report-course-dialog.component.scss']
})
export class ReportCourseDialogComponent implements OnInit {

	// form: FormGroup;

	// reportTitle: string = 'rferf';

	report: ReportCourseData;

  constructor(
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<ReportCourseDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ReportCourseData
	) { 
		this.report = {title: false, prereqs: false};
		// fb.g
		// this.form = this.fb.group({
			// test: 
		// });
	}

  ngOnInit(): void {
		
  }

	save() {
		this.dialogRef.close(this.report);
	}

	close() {
		this.dialogRef.close();
	}



}
