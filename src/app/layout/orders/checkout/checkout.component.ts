import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LocationStrategy } from '@angular/common';
@Component({
  selector: 'yaari-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  txnToken = "";
  orderNumber = "";
  actionUrl: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private locationStrategy: LocationStrategy
    // private pageLoaderService: PageLoaderService,
  ) {
    this.preventBackButton();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queryParam: any) => {
      // this.pageLoaderService.startLoading()
      console.log(queryParam);
      this.txnToken = queryParam.params.txnToken
      this.orderNumber=queryParam.params.orderNumber
      console.log(this.txnToken)
      console.log(this.orderNumber)
      if (!this.txnToken || !this.orderNumber) {
        this.router.navigateByUrl("/")
      } else {
        // this.actionUrl = this.domSanitizer.bypassSecurityTrustResourceUrl
        //   (`${environment.apiUrl}payments/checkout?txnToken=${this.txnToken}&orderNumber=${this.orderNumber}`)
        // this.pageLoaderService.stopLoading()
        this.actionUrl = `${environment.apiUrl}payments/checkout?txnToken=${this.txnToken}&orderNumber=${this.orderNumber}`;
        window.open(this.actionUrl,'_parent');
        // this.router.navigateByUrl("/app/cart");
      }
    }
    )
  }


  // Define a function to handle back button and use anywhere
  preventBackButton() {
   
  }

}