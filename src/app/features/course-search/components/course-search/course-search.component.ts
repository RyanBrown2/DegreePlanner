import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Course, MatchCourseKey } from 'src/app/core/services/courses/course';
import { CourseService } from 'src/app/core/services/courses/course.service';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss']
})
export class CourseSearchComponent implements OnInit {

  public courseSerchForm: FormGroup;

  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private formBuilder: FormBuilder
  ) {
    this.courseSerchForm = this.formBuilder.group({
      subject: new FormControl('All Subjects'),
      search: new FormControl(''),
    });

  }

  ngOnInit(): void {
    this.getCourses();

    this.courseSerchForm.valueChanges.subscribe(x => {
      var subject = MatchCourseKey(x.subject);
      var search = x.search;
      // console.log(`Subject: ${subject} Search: ${search}`);
      this.courseService.getCourses()
        .subscribe(courses => {
          this.courses = courses.filter(c => {
            return c.id.includes(search) && c.subject.includes(subject);
          });
        });

    });
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe(courses => this.courses = courses);
  }

}
