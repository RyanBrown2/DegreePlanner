import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/core/services/course/course.service';
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
				this.courseService.lookupCourseDocument(this.courseId).snapshotChanges().subscribe(c => {
					var tempCourse = c.payload.data() as Course;
					if (tempCourse != null) {
						this.course = tempCourse;
						this.validId = true;
					}
				});
			} else {
				this.validId = false;
			}
		});
	}

}
