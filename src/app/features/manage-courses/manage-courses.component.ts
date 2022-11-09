import { AfterViewInit, Component, ComponentFactoryResolver, Directive, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Course } from 'src/app/core/services/course/course';
import { CourseListComponent } from 'src/app/shared/components/course-list/course-list.component';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.scss']
})
export class ManageCoursesComponent implements OnInit, AfterViewInit {

	@ViewChild('courseList')
	set courseList(v: CourseListComponent) {
		this.courseList = v;
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
		v.addCourse(testCourse);
	}

	constructor(
	) {
		// this.courseList = new CourseListComponent();
	}

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
		this.courseList.addCourse(testCourse);
		// this.courseList.addCourse(testCourse);
	}

	ngAfterViewInit(): void {
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
		this.courseList.addCourse(testCourse);
		
	}

}
