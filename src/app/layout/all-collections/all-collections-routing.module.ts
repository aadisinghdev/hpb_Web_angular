import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCollectionsComponent } from './all-collections.component';
import { CollectionDetailsComponent } from './collection-details/collection-details.component';

const routes: Routes = [
  {
    path: '',
    component: AllCollectionsComponent,
  },
  {
    path: 'details', component: CollectionDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllCollectionsRoutingModule { }
