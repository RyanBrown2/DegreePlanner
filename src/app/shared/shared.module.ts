import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../core/services/auth/auth.service';

// Components
import { CourseListComponent } from './components/course-list/course-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
	CourseListComponent,
	NavbarComponent,
  ],
  imports: [
    CommonModule,
	RouterModule,
  ],
  exports: [
	CourseListComponent,
	NavbarComponent,
  ],
  providers: [ AuthService ]
})
export class SharedModule { }
