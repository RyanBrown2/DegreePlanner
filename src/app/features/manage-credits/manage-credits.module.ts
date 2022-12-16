import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCreditsRoutingModule } from './manage-credits-routing.module';
import { ManageCreditsComponent } from './manage-credits.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';


@NgModule({
  declarations: [
    ManageCreditsComponent
  ],
  imports: [
    CommonModule,
    ManageCreditsRoutingModule,
		SharedModule
  ],
})
export class ManageCreditsModule { }
