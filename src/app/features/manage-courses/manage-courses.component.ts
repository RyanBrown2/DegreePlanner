import { Component, OnInit} from '@angular/core';
import { Course } from 'src/app/shared/models/course.model';
import { CourseService } from 'src/app/core/services/course/course.service';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.scss']
})
export class ManageCoursesComponent implements OnInit {

	courses: Course[] = [];

	constructor(
		private courseService: CourseService
	) {
	}

	ngOnInit(): void {
		this.getCourses();
	}

	getCourses(): void {
		this.courseService.getCourses()
			.subscribe(courses => this.courses = courses);
	}
}
