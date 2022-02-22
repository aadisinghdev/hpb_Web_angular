import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllCollectionsRoutingModule } from './all-collections-routing.module';
import { AllCollectionsComponent } from './all-collections.component';
import { CollectionDetailsComponent } from './collection-details/collection-details.component';


@NgModule({
  declarations: [AllCollectionsComponent, CollectionDetailsComponent],
  imports: [
    CommonModule,
    AllCollectionsRoutingModule
  ]
})
export class AllCollectionsModule { }
