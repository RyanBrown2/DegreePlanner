import { Component, HostListener, OnInit} from '@angular/core';
import { Course } from 'src/app/shared/models/course.model';
import { CourseService } from 'src/app/core/services/course/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.scss']
})
export class ManageCoursesComponent implements OnInit {

	courses: Course[] = [];

	innerWidth: number;

	constructor(
		private courseService: CourseService,
		private router: Router
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
	
	gotoDetailPage(course: Course) {
		// this.router.navigate(['/course-details'], { queryParams: {id : course.id}});
		this.router.navigate([{outlets: {primary: 'course-details', nav: ['course-details']}}], { queryParams: {id : course.id}});
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.innerWidth = window.innerWidth;
	}
}
