import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Course } from 'src/app/shared/models/course.model';

@Component({
  selector: 'app-manage-credits',
  templateUrl: './manage-credits.component.html',
  styleUrls: ['./manage-credits.component.scss']
})
export class ManageCreditsComponent implements OnInit, AfterViewInit {

	courses: Course[] = [];

  constructor(
		private authService: AuthService,
		public userService: UserService
	) {
		this.userService.loadUser();
	}

  ngOnInit(): void {
		// const uid: string = this.authService.userData.uid;
		// console.log(uid);
		// this.userService.loadUser(uid);
  }

	ngAfterViewInit(): void {
		// console.log(this.authService.userData.uid);
	}

	loadUser(uid: string) {
		// console.log(uid);
	}

}
