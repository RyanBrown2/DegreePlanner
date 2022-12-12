import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { AuthService } from '../core/services/auth/auth.service';

// Components
import { CourseListComponent } from './components/course-list/course-list.component';

import { ReportCourseDialogComponent } from './components/report-course-dialog/report-course-dialog.component';


@NgModule({
  declarations: [
	CourseListComponent,
	ReportCourseDialogComponent,
  ],
  imports: [
    CommonModule,
		RouterModule,
		FormsModule,
		LayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatSidenavModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatFormFieldModule,
		ReactiveFormsModule,
  ],
  exports: [
	CourseListComponent,
  ],
  providers: [ AuthService ]
})
export class SharedModule { }
