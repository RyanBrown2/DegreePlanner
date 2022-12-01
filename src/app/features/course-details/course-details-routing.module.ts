import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './course-details.component';

const routes: Routes = [
	{ path: '', component: CourseDetailsComponent },
	{ path: 'course-details', component: CourseDetailsComponent },
	{ path: 'dashboard', component: CourseDetailsComponent },
	{ path: 'manage-courses', component: CourseDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseDetailsRoutingModule { }
