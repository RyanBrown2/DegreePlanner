import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './components/course-list/course-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from '../core/services/auth/auth.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
	CourseListComponent,
	NavbarComponent
  ],
  imports: [
    CommonModule,
	RouterModule
  ],
  exports: [
	CourseListComponent,
	NavbarComponent
  ],
  providers: [ AuthService ]
})
export class SharedModule { }
