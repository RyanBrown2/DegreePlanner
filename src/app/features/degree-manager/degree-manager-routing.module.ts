import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DegreeManagerComponent } from './degree-manager.component';

const routes: Routes = [{ path: '', component: DegreeManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DegreeManagerRoutingModule { }
