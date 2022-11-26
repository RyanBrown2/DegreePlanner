import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';

@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

	@Input() title = '';
	@Input() detailsEnabled: boolean = true;
	@Input() courses!: Course[];

	constructor(
		private router: Router
	) { }

	ngOnInit(): void {
	}

	setCourses(courses: Course[]) {
		this.courses = courses;
	}

	enableDetails(enable: boolean) {
		this.detailsEnabled = enable;
	}

	addCourse(course: Course) {
		if (!this.courses.includes(course)) {
			this.courses.push(course);
		}
	}

	removeCourse(course: Course) {
		const index = this.courses.findIndex(c => {
			c === course;
		});
		delete this.courses[index];
	}

	gotoDetailPage(course: Course) {
		this.router.navigate(['/course-details'], { queryParams: {id : course.id}});
	}

}
