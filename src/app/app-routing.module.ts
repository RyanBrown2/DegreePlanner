import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';


// TODO setup lazy loading
const routes: Routes = [
	{ path: '', redirectTo: '/sign-in', pathMatch: 'full'},
	{ path: 'sign-in', loadChildren: () => import('./features/sign-in/sign-in.module').then(m => m.SignInModule) },
	{ path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
	{ path: 'manage-courses', loadChildren: () => import('./features/manage-courses/manage-courses.module').then(m => m.ManageCoursesModule), canActivate: [AuthGuard] },
	{ path: 'degree-manager', loadChildren: () => import('./features/degree-manager/degree-manager.module').then(m => m.DegreeManagerModule) },	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
