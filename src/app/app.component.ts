import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './core/services/auth/auth.service';

const ToolbarState = {
	hidden: 'hidden',
	main: 'main',
	course_details: 'course-details'
}

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
		private breakpointObserver: BreakpointObserver,
		private router: Router
	) {}

	setMarginTop() {
		if (this.authService.isLoggedIn) {
			return '70px';
			// return '2rem';
		} else {
			return '0px';
		}
	}

	getToolbarState() {
		if (this.authService.isLoggedIn) {
			if (this.router.url.includes('course-details')) {
				return ToolbarState.course_details;
			} else {
				return ToolbarState.main;
			}
		}
		return ToolbarState.hidden;
	}
	

}
