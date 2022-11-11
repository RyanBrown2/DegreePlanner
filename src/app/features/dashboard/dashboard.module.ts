import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreditListComponent } from './components/credit-list/credit-list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CreditListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
	SharedModule
  ]
})
export class DashboardModule { }
