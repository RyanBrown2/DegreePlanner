import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/core/services/course/course.service';
import { NavbarService } from 'src/app/core/services/navbar/navbar.service';
import { ReportCourseDialogComponent } from 'src/app/shared/components/report-course-dialog/report-course-dialog.component';
import { CoursesRequirement, ReqType } from 'src/app/shared/models/course-requirement.model';
import { Course } from 'src/app/shared/models/course.model';

@Component({
	selector: 'app-course-details',
	templateUrl: './course-details.component.html',
	styleUrls: ['./course-details.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CourseDetailsComponent implements OnInit, OnDestroy {

	courseId: string;
	validId: boolean;

	course: Course;

	prereqHTML: any;
	hasPrereqs: boolean = false;

	navbarSubscription: Subscription;

	constructor(
		private activatedRoute: ActivatedRoute,
		public dialog: MatDialog,
		protected sanitizer: DomSanitizer,
		private courseService: CourseService,
		private navbarService: NavbarService,
	) {
		this.courseId = "";
		this.validId = false;
		this.course = new Course();

		this.navbarSubscription = navbarService.courseReported$.subscribe(reportString => {
			this.openDialog();
		});
	}

	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe(params => {
			var tempId = params['id'];
			if (tempId != null) {
				this.courseId = tempId;
				this.courseService.lookupCourseDocument(this.courseId).subscribe(course => {
					if (course != null) {
						this.course = course;
						this.validId = true;
						if (!CoursesRequirement.isEmpty(this.course.prereqs)) {
							this.hasPrereqs = true;
							this.prereqHTML = `<div>Prereqs:</div><div class="prereqContainer">${this.processPrereqs(this.course.prereqs)}</div>`;
						}
					}
				});
			} else {
				this.validId = false;
			}
		});
	}

	ngOnDestroy(): void {
		this.navbarSubscription.unsubscribe();
	}

	openDialog() {
		const dialogRef = this.dialog.open(ReportCourseDialogComponent, {
			data: {
				title: false,
				prereqs: false
			},
		});

		dialogRef.afterClosed().subscribe(data => {
			if (data != undefined) {
				this.courseService.reportCourse(this.course, JSON.stringify(data));
			}
		});
	}

	processCourseReport(reportString: string) {
		this.courseService.reportCourse(this.course, reportString);
	}

	processPrereqs(prereqs: CoursesRequirement): any {

		const prereqElement = document.createElement('div');

		var elementString: string = '';
		
		// console.log(prereqs);
		if (prereqs.type == ReqType.All) {
			elementString += `All the following must be met:`;
		} else if (prereqs.type == ReqType.Any) {
			elementString += `<div>One the following must be met:</div>`;
		} else {
			elementString += `<div>The following must be met:</div>`;
		}

		
		// elementString += '<div class="prereqsContainer">';

		prereqs.courses.forEach(course => {
			elementString += `<div class="coursePrereq">${course}</div>`;
		});

		prereqs.reqs.forEach(req => {
			// elementString += `<div class="subPrereq">${this.processPrereqs(req)}</div>`;
			elementString += `<div class="subPrereq border rounded">${this.processPrereqs(req)}</div>`;
		});

		if (prereqs.extra !== '') {
			elementString += `<div class="extraPrereq">${prereqs.extra}</div>`;
		}

		// elementString += '</div>';

		// console.log(elementString);
		return elementString;
	}

	reportCourse() {

	}

}

