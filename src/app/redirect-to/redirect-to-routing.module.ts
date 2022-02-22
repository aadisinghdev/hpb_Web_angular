import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedirectToComponent } from './redirect-to.component';

const routes: Routes = [{
    path : '',
    component : RedirectToComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedirectToRoutingModule { }
