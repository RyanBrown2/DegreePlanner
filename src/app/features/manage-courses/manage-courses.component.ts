import { Component, HostListener, OnInit} from '@angular/core';
import { Course } from 'src/app/shared/models/course.model';
import { CourseService } from 'src/app/core/services/course/course.service';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.scss']
})
export class ManageCoursesComponent implements OnInit {

	courses: Course[] = [];

	innerWidth: number;

	constructor(
		private courseService: CourseService
	) {
		this.innerWidth = window.innerWidth;		
	}

	ngOnInit(): void {
		this.courseService.queryCourses();
		this.getCourses();
	}

	getCourses(): void {
		this.courseService.getCourses()
			.subscribe(courses => this.courses = courses);
	}

	isMobile(): boolean {
		return (this.innerWidth <= 768);
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.innerWidth = window.innerWidth;
	}
}
