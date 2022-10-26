import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/core/services/courses/course';
import { CourseService } from 'src/app/core/services/courses/course.service';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss']
})

export class CourseSearchComponent implements OnInit {

  courses: Course[] = [];

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe(courses => this.courses = courses);
  }

}
