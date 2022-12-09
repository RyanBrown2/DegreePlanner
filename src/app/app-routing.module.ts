import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { NavbarCourseDetailsComponent } from './shared/components/navbar-course-details/navbar-course-details.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

const routes: Routes = [
	{ path: '', redirectTo: '/sign-in', pathMatch: 'full'},
	{ path: 'sign-in', loadChildren: () => import('./features/sign-in/sign-in.module').then(m => m.SignInModule) },
	{ path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
	{ path: 'manage-courses', loadChildren: () => import('./features/manage-courses/manage-courses.module').then(m => m.ManageCoursesModule), canActivate: [AuthGuard] },
	{ path: 'degree-manager', loadChildren: () => import('./features/degree-manager/degree-manager.module').then(m => m.DegreeManagerModule), canActivate: [AuthGuard] },
	{ path: 'course-details', loadChildren: () => import('./features/course-details/course-details.module').then(m => m.CourseDetailsModule), canActivate: [AuthGuard] },	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
