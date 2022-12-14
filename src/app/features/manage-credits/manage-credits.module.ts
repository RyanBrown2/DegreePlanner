import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCreditsRoutingModule } from './manage-credits-routing.module';
import { ManageCreditsComponent } from './manage-credits.component';


@NgModule({
  declarations: [
    ManageCreditsComponent
  ],
  imports: [
    CommonModule,
    ManageCreditsRoutingModule
  ]
})
export class ManageCreditsModule { }
