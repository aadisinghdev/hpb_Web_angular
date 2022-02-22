import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service.js';
import "../../../assets/js/popper.min.js";
import * as $ from "jquery"
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserProfileService } from 'src/app/shared/services/user-profile.service.js';
import { UserProfileComponent } from '../user-profile/user-profile.component.js';
import { ShareDataService } from 'src/app/shared/services/share-data.service.js';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service.js';
@Component({
  selector: 'yaari-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit,AfterViewInit
 {

  @ViewChild(UserProfileComponent) userProfile:UserProfileComponent
  // public dropdown:boolean=false
  public isBtnClicked: boolean = false;
  public userOptions: boolean = false;
  public searchValue: string = '';
  public productList: any = [];
  public placeValue: any = 'search products...'
  private docEle: any = {};
  public productCount: any = 0;
  public imgUrl: any = '';
  public userRecord:any;
  public cartDetails: any = [];
  public totalPrice: any = 0;
  public totalDiscount: any = 0;
  public totalAmount: any = 0;
  public totalQuantity: any = 0;
  public deliveryCharges : any = 0;
  public showCart:boolean
  public previousCount:number
  public profileImg:any;


  constructor(private changeDetectorRef: ChangeDetectorRef, private router: Router,
    private productService: ProductService, private cookie: CookieService,
    private cartService: CartService, private userService: UserProfileService,
    private localStorageService: LocalStorageService,private share:ShareDataService) {
      console.log("constructor");
    this.cartService.cartItemCount.subscribe(response => {
      this.productCount = response;
    })
    this.share.cartDetails.subscribe((res:any[]) => {
      this.cartDetails=res;
      this.totalAmount = 0;
          this.totalDiscount = 0;
          this.totalQuantity = 0;
          this.totalPrice = 0;
          this.setTotalAmount()
    })

    this.share.productCount.subscribe((res:any)=> {
      this.productCount=res
    })

    this.share.profileImage.subscribe((res:any) => {
      this.profileImg=res
    })

    console.log("init");
    console.log('localStorage.getItem ', localStorage.getItem('user-detail'));
    if (localStorage.getItem('user-detail')) {
      this.getUserRecord();
    }
  }

  ngOnInit(): void {

    console.log("getCartDetails");
     this.getCartDetail();

    console.log("getUserRecord");
     this.getUserRecord();
     

    let userId=JSON.parse(this.localStorageService.get('user-detail')).id;
    this.userService.getUserDetailsById(userId).subscribe((response:any[])=>{        
      this.share.profileImage.next(response['profileImage'])
    }, 
    error => {
    console.log("uuuuser========", error);
    })

     
  }


  ngAfterViewInit(){    


  }

  

  get isUserLoggedIn() {
    if (localStorage.getItem('token')) {
      // this.getUserRecord();
      return true;
    }
    else {
      return false;
    }
  }

  /**
 * Close signin signup option popup
 * @param event event object
 */
  closePopUp(event) {
    let _that = this;
    if (event.target.id == 'sign_in_option') {
      if (document.querySelector(".before_login")) {
        document.querySelector(".before_login").addEventListener('click', (e) => {
          _that.docEle = e;
        });
      }
    } else if (event.target != _that.docEle['target']) {
      this.isBtnClicked = false;
      this.userOptions = false;
    }
  }

  logout() {
    let _that = this;
    localStorage.clear()
    this.userOptions = false;
    this.cookie.deleteAll('/');
    window.location.reload();
    _that.router.navigate(['/home']);
    this.changeDetectorRef.detectChanges()
  }

  get getUserName() {
    if (localStorage.getItem('user-detail')) {
      let userObj = JSON.parse(localStorage.getItem('user-detail'));
      return userObj.name;
    }
  }

 get cartCount(){
     return this.productCount  
 }

  searchProduct(event) {
    // console.log("search product");
    // let text = event.term;
    this.searchValue=event.term;
    this.productList = [];
    if (this.searchValue === '' || this.searchValue.length < 1) {
      this.placeValue = "search Products...";
      this.searchValue=""
      return
    }
    else{
      this.placeValue = "";
      this.productService.searchProducts(this.searchValue).subscribe((res : any[]) => {
      this.productList = res
      // console.log(res.slice(0,20));
    })
    }
  }

  onChange(product) {
    console.log("Onchange"+product);
    if (product) {
      // this.router.navigateByUrl(`app/products/detail/${product.id}/${product.productId}`);
      const url=`app/products/detail/${product.id}/${product.productId}`
      window.open(url, '_blank');
    }
  }

  getCartDetail() {
    let cartObj = {};
    if (this.cookie.get('cart')) {
      cartObj = JSON.parse(this.cookie.get('cart'));
      if (cartObj) {
        this.cartService.getCart(cartObj['id']).subscribe((res: any[]) => {
          this.productCount = res.length;
          this.share.productCount.next(res.length)
          if(this.productCount<1){
            this.showCart=false
          }
          else{
            this.showCart=true
          }
          this.cartDetails = res;
          console.log(this.cartDetails)
          this.totalAmount = 0;
          this.totalDiscount = 0;
          this.totalQuantity = 0;
          this.totalPrice = 0;
          this.setTotalAmount();          
        })
      }
    } else {
      // this.productCount = 0;
      this.share.cartDetails.next("")
      this.share.productCount.next(0)
    }
  }

  callCartDetails(){
    this.getCartDetail();
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

  getUserRecord() {
    this.userService.getUserDetails().subscribe((response: any[]) => {
      

      if (response) {
        console.log('response: ', response);
        if(response['profileImage']){
          this.imgUrl = response['profileImage'];
        }else{
          this.imgUrl = '../../../assets/images/profile_default.svg';

        }
      } else {
        this.imgUrl = '../../../assets/images/profile_default.svg';
      }
    }, error => {
      console.log("user details error", error);
    })
  }

  // get imageUrl(){
  //   return this.imgUrl ? this.imgUrl : '../../../assets/images/profile_default.svg';
  // }
  // get cartProductCount(){
  //   return this.productCount;
  // }

 
  

  onClose(){
    console.log("onClose");
    this.searchValue="";
    this.placeValue="search products..."
    this.productList=[];
  }


}
