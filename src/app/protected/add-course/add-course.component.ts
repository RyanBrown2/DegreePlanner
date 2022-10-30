import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Course, MatchCourseKey } from 'src/app/core/services/courses/course';
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
      title: new FormControl(''),
      description: new FormControl(''),
      prereqs: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  addCourse() {
    const subject = MatchCourseKey(this.addCourseForm.get('subject')?.value);
    const number = this.addCourseForm.get('number')?.value;
    const title = this.addCourseForm.get('title')?.value;
    const description = this.addCourseForm.get('description')?.value;
    
    const prereqsText: string = this.addCourseForm.get('prereqs')?.value;
    prereqsText.replace(" ", "");
    const prereqsSplit: string[] = prereqsText.split(",");
    
    const course = {id: subject+number, subject: subject, number: number, title: title, description: description, prereqs: prereqsSplit} as Course;

    // console.log(course);
    this.courseService.addCourse(course); 
  }

}
