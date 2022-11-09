import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCoursesRoutingModule } from './manage-courses-routing.module';
import { ManageCoursesComponent } from './manage-courses.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ManageCoursesComponent,
  ],
  imports: [
    CommonModule,
    ManageCoursesRoutingModule,
	SharedModule
  ]
})
export class ManageCoursesModule { }
