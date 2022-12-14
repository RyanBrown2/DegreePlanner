import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCreditsComponent } from './manage-credits.component';

const routes: Routes = [{ path: '', component: ManageCreditsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCreditsRoutingModule { }
