import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/core/services/course/course.service';
import { CoursesRequirement, ReqType } from 'src/app/shared/models/course-requirement.model';
import { Course } from 'src/app/shared/models/course.model';

@Component({
	selector: 'app-course-details',
	templateUrl: './course-details.component.html',
	styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

	courseId: string;
	validId: boolean;

	course: Course;

	prereqHTML: string = '';

	constructor(
		private activatedRoute: ActivatedRoute,
		private courseService: CourseService
	) {
		this.courseId = "";
		this.validId = false;
		this.course = new Course();
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
						if (this.course.prereqs != new CoursesRequirement) {
							this.prereqHTML = this.processPrereqs(this.course.prereqs);
						}
					}
				// 	var tempCourse = c.payload.data();
				// 	if (tempCourse != null) {
				// 		this.course = tempCourse;
				// 		this.validId = true;
				// 		if (this.course.prereqs != new CoursesRequirement) {
				// 			this.prereqHTML = this.processPrereqs(this.course.prereqs);
				// 		}
				// 	}
				});
			} else {
				this.validId = false;
			}
		});

	}

	processPrereqs(prereqs: CoursesRequirement): string {
		var elementString: string = '';
		
		console.log(prereqs);
		if (prereqs.type == ReqType.All) {
			elementString += `<div>All the following must be met:</div>`;
		} else if (prereqs.type == ReqType.Any) {
			elementString += `<div>One the following must be met:</div>`;
		}

		prereqs.courses.forEach(course => {
			elementString += `<div>${course}</div>`;
		});

		prereqs.reqs.forEach(req => {
			elementString += `<div>${this.processPrereqs(req)}</div>`;
		});

		if (prereqs.extra != '') {
			elementString += `<div>${prereqs.extra}</div>`;
		}

		// return this.sanitizer.bypassSecurityTrustHtml(elementString);
		return elementString;
	}

	hasPrereqs() {
		return true;
	}

}

