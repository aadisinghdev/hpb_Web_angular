import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../shared/services/cart.service';
import { ShareDataService } from '../shared/services/share-data.service';

@Component({
  selector: 'yaari-redirect-to',
  templateUrl: './redirect-to.component.html',
  styleUrls: ['./redirect-to.component.scss']
})
export class RedirectToComponent implements OnInit {
  public isPaymentSuccessfull : boolean = false;
  public isPaymentFailed : boolean = false;
  constructor(private route: ActivatedRoute,
              private router : Router,
              private cookie: CookieService,
              private cart:CartService,
              private share:ShareDataService,
              private toastr: ToastrService) { }

  public userObj:any
  public cartObj:any
  public cartDetails:any=[];
              
  ngOnInit(): void {

    if (localStorage.getItem('user-detail')) {
      this.userObj = JSON.parse(localStorage.getItem('user-detail'));
      console.log("User Details: "+this.userObj.id)
    }
    
    if (this.route.snapshot.queryParams) {
      console.log(this.route.snapshot.queryParams)
      if (this.route.snapshot.queryParams['status'] == 'success') {
        this.isPaymentSuccessfull = true;

        if (this.cookie.get('cart')){
          this.cartObj = JSON.parse(this.cookie.get('cart'));
          this.cart.getCart(this.cartObj.id).subscribe((response: any[]) => {
            this.cartDetails=response;

            for (let index = 0; index < response.length; index++) {
              const element = response[index];
              console.log(response[index].productId)
              this.cart.deleteCartDetail(response[index].id).subscribe(res =>{
                console.log(res)
              })
            }
            this.cookie.delete('cart');

          this.share.productCount.next(0)
          this.share.cartDetails.next("")
            // this.share.setCartCount();
          })
        }
        setTimeout(()=>{
          this.router.navigateByUrl('/app/cart');
          this.toastr.success('Order created successfully');
        },5000)
      } 
      else if (this.route.snapshot.queryParams['status'] == 'failed') {
        this.isPaymentFailed = true;
        this.isPaymentSuccessfull = false;
        setTimeout(()=>{
          this.router.navigateByUrl('/app/cart');
        },5000)
      }
    }
  }
}
