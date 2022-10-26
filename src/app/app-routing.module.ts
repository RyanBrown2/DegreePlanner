import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './protected/dashboard/dashboard.component';
import { SignInComponent } from './public/sign-in/sign-in.component';

import { AuthGuard } from './core/guards/auth/auth.guard';

// TODO setup lazy loading
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent},
  // { path: 'dashboard', component: DashboardComponent }
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
