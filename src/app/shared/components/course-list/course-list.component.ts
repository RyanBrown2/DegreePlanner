import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/core/services/course/course';

@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

	@Input() title = '';

	@Input() courses!: Course[];
	// courses: Course[] = [];

	constructor() { }

	ngOnInit(): void {
		const testCourse: Course = {
			id: 'ma111',
			subject: 'ma',
			number: '111',
			title: 'Calculus 1',
			description: 'Calc 1 description',
			prereqs: [],
			prereqsText: '',
			searchText:'search'
		};
		// this.addCourse(testCourse);
	}

	setCourses(courses: Course[]) {
		this.courses = courses;
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

}
