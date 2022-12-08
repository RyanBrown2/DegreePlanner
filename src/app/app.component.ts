import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './core/services/auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'degree-planner';
	 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

	constructor(
		public authService: AuthService,
		private breakpointObserver: BreakpointObserver
	) {}

	setMarginTop() {
		if (this.authService.isLoggedIn) {
			return '70px';
			// return '2rem';
		} else {
			return '0px';
		}
	}
}
