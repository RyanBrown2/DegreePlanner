import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
import { CourseService } from './services/course/course.service';
import { UserService } from './services/user/user.service';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
	],
	providers: [ AuthService, CourseService, UserService ]
})
export class CoreModule {
	
	constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
		if (parentModule) {
			throw new Error(
				'CoreModule is already loaded. Import it in the AppModule only');
		}
	}
}
