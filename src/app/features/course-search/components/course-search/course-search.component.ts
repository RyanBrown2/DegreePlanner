import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Course } from 'src/app/core/services/courses/course';
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
      subject: new FormControl('all'),
      number: new FormControl(''),
    });

  }

  ngOnInit(): void {
    this.getCourses();

    this.courseSerchForm.valueChanges.subscribe(x => {
      console.log(`Subject: ${x.subject} Number: ${x.number}`);
      const subject = x.subject;
      const number = x.number;

      if (subject == 'all') {
        if (number == "") {
          this.courseService.getCourses()
            .subscribe(courses => this.courses = courses);
        } else {
          this.courseService.getCourses()
            .subscribe(courses => {
              this.courses = courses.filter(c => c.number === number);
            });
        }
      } else {
        if (number == "") {
          this.courseService.getCourses()
            .subscribe(courses => {
              this.courses = courses.filter(c => c.subject === subject);
            });
        } else {
          this.courseService.getCourses()
            .subscribe(courses => {
              this.courses = courses.filter(c => c.id === subject+number);
            });
        }
      }

    });
  }

  filterSubject(subject: string): void {
    if (subject == "all") {
      
      return;
    }
    // this.courseService.getCourses()
    //   .subscribe(courses => {
    //     this.courses = courses.filter(c => c.subject === subject)
    //   });
    this.courses = this.courses.filter(c => c.subject === subject);
    // this.courses = this.courseService.getSubjectCourses(subject);
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe(courses => this.courses = courses);
  }

}
