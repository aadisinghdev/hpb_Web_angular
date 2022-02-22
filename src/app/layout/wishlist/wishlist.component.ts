import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'yaari-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  @ViewChild('WarningModal') WarningModal;
  public wishlistDetails: any = [];
  public totalPrice: any = 0;
  public totalDiscount: any = 0;
  public totalAmount: any = 0;
  public totalQuantity: any = 0;
  public wishlistObj: any = {};
  constructor(private cartService: CartService, private wishlistService: WishlistService, private cookie: CookieService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getWishlistDetail();
    // this.getWishlist();
  }

  getWishlistDetail() {
    if (this.cookie.get('wishlist')) {
      this.wishlistObj = JSON.parse(this.cookie.get('wishlist'));
      this.wishlistService.fetchWishListDetails(this.wishlistObj.id).subscribe(res => {
        this.wishlistDetails = res;
        this.totalAmount = 0;
        this.totalDiscount = 0;
        this.totalQuantity = 0;
        this.totalPrice = 0;
        this.setTotalAmount();
      })
    }
  }

  getWishlist(){
    if(localStorage.getItem('user-detail')){
      const user=JSON.parse(localStorage.getItem('user-detail'));
      this.wishlistService.getWishlistByUserId(user['id']).subscribe((response:any[])=>{
        console.log(response)
      },error => {
        console.log(error)
      })
    }
  }

  setTotalAmount() {
    for (let ele of this.wishlistDetails) {
      this.totalQuantity += ele.quantity;
      this.totalPrice += Math.round(ele.product.price * ele.quantity);
      this.totalDiscount += Math.round((ele.product.price * ele.quantity) - (ele.product.sellingPrice * ele.quantity));
    }
    this.totalAmount = Math.round(this.totalPrice - this.totalDiscount);
    console.log("quantity after", typeof this.totalAmount);
  }

  increaseQuantity(quantity, id) {
    if (quantity != 10) {
      quantity = quantity + 1;
      for (let item of this.wishlistDetails) {
        if (item.product.id == id) {
          item.quantity = quantity;
          this.totalAmount = 0;
          this.totalQuantity = 0;
          this.totalPrice = 0;
          this.totalDiscount = 0;
        }
      }
      this.setTotalAmount();
    }
  }

  decreaseQuantity(quantity, id) {
    if (quantity > 1) {
      quantity = quantity - 1;
      for (let item of this.wishlistDetails) {
        if (item.product.id == id) {
          item.quantity = quantity;
          this.totalAmount = 0;
          this.totalQuantity = 0;
          this.totalPrice = 0;
          this.totalDiscount = 0;
        }
      }
      this.setTotalAmount();
      // this.setTotalAmount();
    }
  }

  get isUserLoggedIn() {
    return localStorage.getItem('token');
  }

  // placeOrder() {
  //   if(!this.isUserLoggedIn){
  //       this.WarningModal.open();
  //   }else{

  //     this.router.navigate(['/app/orders/place-order'], { queryParams: { id: this.cartObj.id } });
  //   }
  // }

  removeProductFromWishlist(id) {
    this.wishlistService.deleteWishlistDetail(id).subscribe(res => {
      console.log("-success-- remove product");
      this.getWishlistDetail();
    }, error => {
      console.log("error remove product", error);
    })
  }

  moveToCart(item) {
    if (!this.cookie.get('cart')) {
      this.cartService.createCart().subscribe(res => {
        if (res['id']) {
          const payload = {
            cartId: res['id'],
            productId: JSON.parse(item.productId),
            quantity: item,
            businessId: item['businessId']
          }
          this.cartService.createCartDetail(payload).subscribe(response => {
            console.log("response---", response);
            this.cartService.getCart(res['id']).subscribe((res: any[]) => {
              this.cartService.cartItemCount.next(res.length);
            })
            try {
              this.toastr.success('Product added successfully');
            } catch (error) {
              this.toastr.error('Error,', error);
            }
          })
        }
        this.cookie.set('cart', JSON.stringify({ id: res['id'] }), { expires: 365, path: '/' });
      })
    } else {
      const cartObj = JSON.parse(this.cookie.get('cart'));
      const payload = {
        cartId: cartObj['id'],
        productId: JSON.parse(item.productId),
        quantity: item.quantity,
        businessId: item['businessId']
      }
      this.cartService.createCartDetail(payload).subscribe(response => {
        this.toastr.success('Product added successfully',);
        this.cartService.getCart(cartObj['id']).subscribe((res: any[]) => {
          this.cartService.cartItemCount.next(res.length);
        })
        this.removeProductFromWishlist(item.id);
      }, err => {
        this.toastr.success('Error occurred while moving product',);
      })
    }
  }
}
