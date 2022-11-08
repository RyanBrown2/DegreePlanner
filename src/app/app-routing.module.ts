import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';


// TODO setup lazy loading
const routes: Routes = [
	{ path: '', redirectTo: '/public', pathMatch: 'full'},
	{ path: 'public', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
	{ path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
	{ path: 'protected', loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule), canActivate: [ AuthGuard ] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
