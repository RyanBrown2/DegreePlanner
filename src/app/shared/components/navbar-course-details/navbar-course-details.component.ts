import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar-course-details',
  templateUrl: './navbar-course-details.component.html',
  styleUrls: ['./navbar-course-details.component.scss']
})
export class NavbarCourseDetailsComponent implements OnInit {

	constructor(
		public authService: AuthService,
		private router: Router
	) { }

	ngOnInit(): void {
	}

	nav(dir: string) {
		this.router.navigate([{outlets: {primary: dir, nav: null}}]);
	}

	signOut() {
		this.nav('sign-in');
		this.authService.SignOut();
	}

}
