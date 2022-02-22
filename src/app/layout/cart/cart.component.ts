import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/shared/services/wishlist.service.js';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { ShareDataService } from 'src/app/shared/services/share-data.service';
import { PageLoaderService } from 'src/app/shared/page-loader/page-loader.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('WarningModal') WarningModal;
  public cartDetails: any = [];
  public totalPrice: any = 0;
  public totalDiscount: any = 0;
  public totalAmount: any = 0;
  public totalQuantity: any = 0;
  public cartObj: any = {};
  public deliveryCharges : any = 0;
  constructor(private cartService: CartService, private cookie: CookieService, private router: Router,
    private toastr: ToastrService, private wishlistService: WishlistService,
    private localStorageService: LocalStorageService,private share:ShareDataService,
    private pageLoaderService: PageLoaderService) { }

  ngOnInit(): void {
    this.getCartDetail();
  }

  getCartDetail() {
    // this.pageLoaderService.startLoading();
    if (this.cookie.get('cart')) {
      this.cartObj = JSON.parse(this.cookie.get('cart'));
      this.cartService.getCart(this.cartObj.id).subscribe((res: any[]) => {
        this.cartService.cartItemCount.next(res.length ? res.length : 0);
        this.cartDetails = res;
        console.log(this.cartDetails)
        this.totalAmount = 0;
        this.totalDiscount = 0;
        this.totalQuantity = 0;
        this.totalPrice = 0;
        this.setTotalAmount();
      // this.pageLoaderService.stopLoading();
      })
    }
  }

  setTotalAmount() {
    for (let ele of this.cartDetails) {
      this.totalQuantity += ele.quantity;
      this.totalPrice += Math.round(ele.product.price * ele.quantity);
      this.totalDiscount += Math.round((ele.product.price * ele.quantity) - (ele.product.sellingPrice * ele.quantity));
    }
    this.totalAmount = Math.round(this.totalPrice - this.totalDiscount);
    if(this.totalAmount < 500){
        this.deliveryCharges = 100;
        this.totalAmount = this.totalAmount + this.deliveryCharges;
    }else {
      this.deliveryCharges = 0;
    }
  }

  increaseQuantity(quantity, id , cartDetailId, availableStock) {
    if (quantity != availableStock) {
      quantity = quantity + 1;
      const payload = {quantity : quantity};
      this.cartService.updateCartDetail(cartDetailId ,payload).subscribe(res =>{
          console.log("res",res);
      })
      for (let item of this.cartDetails) {
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

  decreaseQuantity(quantity, id, cartDetailId) {
    if (quantity > 1) {
      quantity = quantity - 1;
      const payload = {quantity : quantity};
      this.cartService.updateCartDetail(cartDetailId , payload).subscribe(res =>{
          console.log("res",res);
      })
      for (let item of this.cartDetails) {
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

  placeOrder() {
    if (!this.isUserLoggedIn) {
      this.WarningModal.open();
      this.router.navigateByUrl("/login?status=buy")
    } else {

      this.router.navigate(['/app/orders/place-order'], { queryParams: { id: this.cartObj.id } });
    }
  }

  removeProductFromCart(id) {
    const cartObj = JSON.parse(this.cookie.get('cart'));
    // this.pageLoaderService.startLoading();
    this.cartService.deleteCartDetail(id).subscribe((res:any[]) => {
      this.cartService.getCart(cartObj['id']).subscribe((response: any[]) => {
        console.log("-success-- remove product");
        this.getCartDetail();
        this.share.productCount.next(response.length)
         this.share.cartDetails.next(response)
        //  this.pageLoaderService.stopLoading();
      })
      
    }, error => {
      console.log("error remove product", error);
    })
  }

  moveToWishlist(item) {
    let payload;
    if (this.userDetail) {
      payload = { userId: this.userDetail.id };
    } else {
      payload = { userId: null };
    }
    if (!this.cookie.get('wishlist')) {
      this.wishlistService.createWishList(payload).subscribe(res => {
        if (res['id']) {
          const data = {
            wishlistId: res['id'],
            productId: JSON.parse(item.productId),
            quantity: item.quantity,
            businessId: item['businessId']
          }
          this.addToWishListDetails(data, item);
          this.cookie.set('wishlist', JSON.stringify({ id: res['id'] }), { expires: 365, path: '/' });
        }
      })
    } else if (this.cookie.get('wishlist')) {
      const data = {
        wishlistId: this.wishlistObj['id'],
        productId: JSON.parse(item.productId),
        quantity: item.quantity,
        businessId: item['businessId']
      }
      this.addToWishListDetails(data, item);
    }
  }

  get wishlistObj() {
    return JSON.parse(this.cookie.get('wishlist'));
  }

  addToWishListDetails(data, item) {
    this.wishlistService.createWishListDetail(data).subscribe(res => {
      this.removeProductFromCart(item.id);
      this.toastr.success('Successfully added to wishlist');
    }, error => {
      this.toastr.error('Some error occurred while adding to wishlist please try again');
    })
  }

  get userDetail() {
    if (this.localStorageService.get('user-detail')) {
      return JSON.parse(this.localStorageService.get('user-detail'));
    } else {
      return false;
    }
  }
}
