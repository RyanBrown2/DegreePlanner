import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseSearchComponent } from './components/course-search/course-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CourseSearchComponent
  ],
  exports: [
    CourseSearchComponent
  ]
})
export class CourseSearchModule { }
