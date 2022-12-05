import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NavbarService } from 'src/app/core/services/navbar/navbar.service';

@Component({
  selector: 'app-navbar-course-details',
  templateUrl: './navbar-course-details.component.html',
  styleUrls: ['./navbar-course-details.component.scss']
})
export class NavbarCourseDetailsComponent implements OnInit {

	constructor(
		public authService: AuthService,
		private navbarService: NavbarService,
		private router: Router,
	) { }

	ngOnInit(): void {
	}

	submitCourseReport() {
		let reportTitle: boolean = false;
		let reportPrereqs: boolean = false;

		if (document.querySelector('#courseReportTitle')?.classList.length === 2) {
			reportTitle = true;
		}
		
		if (document.querySelector('#courseReportPrereqs')?.classList.length === 2) {
			reportPrereqs = true;
		}

		this.navbarService.reportCourse(JSON.stringify({title: reportTitle, prereqs: reportPrereqs}));
	}

	nav(dir: string) {
		this.router.navigate([{outlets: {primary: dir, nav: null}}]);
	}

	signOut() {
		this.nav('sign-in');
		this.authService.SignOut();
	}

}
