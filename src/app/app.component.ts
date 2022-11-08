import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'degree-planner';

	constructor(
		public authService: AuthService
	) {}

	setMarginTop() {
		if (this.authService.isLoggedIn) {
			return '75px';
		} else {
			return '0px';
		}
	}
}
