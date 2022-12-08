import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../core/services/auth/auth.service';

// Components
import { CourseListComponent } from './components/course-list/course-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarCourseDetailsComponent } from './components/navbar-course-details/navbar-course-details.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MaterialNavbarComponent } from './components/material-navbar/material-navbar.component';

@NgModule({
  declarations: [
	CourseListComponent,
	NavbarComponent,
	NavbarCourseDetailsComponent,
	MaterialNavbarComponent,
  ],
  imports: [
    CommonModule,
	RouterModule,
	LayoutModule,
	MatToolbarModule,
	MatButtonModule,
	MatSidenavModule,
	MatIconModule,
	MatListModule,
  ],
  exports: [
	CourseListComponent,
	NavbarComponent,
  ],
  providers: [ AuthService ]
})
export class SharedModule { }
