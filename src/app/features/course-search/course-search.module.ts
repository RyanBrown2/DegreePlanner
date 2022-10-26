import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseSearchComponent } from './components/course-search/course-search.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CourseSearchComponent
  ],
  exports: [
    CourseSearchComponent
  ]
})
export class CourseSearchModule { }
