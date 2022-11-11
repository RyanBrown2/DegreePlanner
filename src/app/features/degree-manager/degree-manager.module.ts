import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DegreeManagerRoutingModule } from './degree-manager-routing.module';
import { DegreeManagerComponent } from './degree-manager.component';


@NgModule({
  declarations: [
    DegreeManagerComponent
  ],
  imports: [
    CommonModule,
    DegreeManagerRoutingModule
  ]
})
export class DegreeManagerModule { }
