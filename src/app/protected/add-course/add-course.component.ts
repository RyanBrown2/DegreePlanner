import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Course } from 'src/app/core/services/courses/course';
import { CourseService } from 'src/app/core/services/courses/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  public addCourseForm: FormGroup;
  constructor(
    private courseService: CourseService,
    private formBuilder: FormBuilder
  ) {
    this.addCourseForm = this.formBuilder.group({
      subject: new FormControl(''),
      number: new FormControl(''),
      prereqs: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  addCourse() {
    const subject = this.addCourseForm.get('subject')?.value;
    const number = this.addCourseForm.get('number')?.value;
    const course = new Course(subject, number);
    const prereqsText: string = this.addCourseForm.get('prereqs')?.value;

    const prereqsSplit = prereqsText.split(",");
    
    for (var prereq of prereqsSplit) {
      prereq.replace(" ", "");
      if (!course.prereqs.includes(prereq)) {
        course.addPrereq(prereq);
      }
    }

    this.courseService.addCourse(Course.toData(course)); 
  }

}
