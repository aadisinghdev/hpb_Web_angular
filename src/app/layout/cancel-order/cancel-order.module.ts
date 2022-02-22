import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelModalComponent } from './cancel-modal/cancel-modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [CancelModalComponent],
  imports: [
    CommonModule,
    NgbModalModule
  ],
  // exports:[
  //   CancelModalComponent
  // ]
})
export class CancelOrderModule { }
