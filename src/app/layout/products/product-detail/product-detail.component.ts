import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service.js';
import { CartService } from 'src/app/shared/services/cart.service.js';
import { OrderService } from 'src/app/shared/services/order.service.js';
import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WishlistService } from 'src/app/shared/services/wishlist.service.js';
import { AuthService } from 'src/app/shared/services/auth.service.js';
import "../../../../assets/js/product_zoom.js";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShareDataService } from 'src/app/shared/services/share-data.service.js';
import { DeliveryPincodeService } from 'src/app/shared/services/delivery-pincode.service.js';
import { PageLoaderService } from 'src/app/shared/page-loader/page-loader.service.js';
@Component({
  selector: 'yaari-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('warningModal') warningModal;
  constructor(private localStorageService: LocalStorageService, private cookie: CookieService,
    private readonly http: HttpClient, private route: ActivatedRoute,
    private productService: ProductService, private cartService: CartService,
    private orderService: OrderService, private router: Router,
    private toastr: ToastrService, private modalService: NgbModal,
    private wishlistService: WishlistService,
    private builder: FormBuilder,
    private deliverypincodeService:DeliveryPincodeService,
    private share: ShareDataService,
    private pageLoaderService: PageLoaderService) {

    this.productService.currentProductStage.subscribe(res => {
      console.log(res);
      if (res && res.id) {
        this.productId = res.id;
        this.productKey = res.productId
      }
      // this.getProductDetailById();
    })
    // this is for routerLink on same component when only queryParameter changes
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  //change 
  public haveWishlist:boolean=false
  public modalRef: NgbModalRef;
  public quantity: number = 1;
  public productId: any = 0;
  public productKey: string;
  public productObj: any = {};
  public productReview: any = []
  public products: any[] = [];
  public showBuyNowBtn: boolean = true;
  public subTotal: any = 0;
  public productList: any = [];
  public isProductExist: boolean = false;
  public isProductExistInWishlist: boolean = false;
  public start = 0;
  public end = 4;
  public itemsPerPage = 3;
  public deliveryPincode: FormGroup = new FormGroup({});
  public deliveryDate: string = "";
  public service_available: boolean = false;
  public pincode_check: boolean = false;
  public businessId: number;
  public product_weight: number;
  public productThumbImage: any
  public addReview: FormGroup = new FormGroup({});
  public showNextButton: boolean = true;
  public collectUsers: any
  public userDetails: any
  public showComment: boolean = false
  public colors: any[] = [];
  public size: any[] = [];
  public selectedProductIndex: number;
  public cart:any
  public selectSize:any
  public selectColor:any
  public haveFreeSize:boolean=false
  public  panelOpenState:boolean = false;
  public productSpecification:any
  public sideImages:any[];
  public sizechartImg:any;
  ngOnInit(): void {
    // if (this.route.snapshot.params.id) {
    //   this.productId = this.route.snapshot.params.id;
    //   this.productKey = this.route.snapshot.params.productId;
    //   console.log(this.productId);

    // }

    this.route.params.subscribe(params => {
      if(params['id']) {
        console.log(params['id']);
        console.log(params['productId']);
        this.productId = params['id'];
        this.productKey = params['productId'];
        console.log(this.productId);
        console.log(this.productKey);
      }
    })
    if (this.cookie.get('cart')) {
      const cartObj = JSON.parse(this.cookie.get('cart'));
      this.showBuyNowBtn = true;
      this.cartService.isProductExistInCart(cartObj['id'], JSON.parse(this.productId)).subscribe((response: any[]) => {
        if (response.length) {
          this.isProductExist = true;
        } else {
          this.isProductExist = false;
        }
      })
    }


    //updated code
    if (this.localStorageService.get('token')) {
      // this.show = true;
      // this.abc = true;
      this.haveWishlist=true

    }

    if (!!localStorage.getItem('user-detail')) {
      this.userDetails = JSON.parse(localStorage.getItem('user-detail'))
      this.showComment = true
    }

    if (this.cookie.get('wishlist')) {
      this.wishlistService.isProductExistInWishlist(this.wishlistObj['id'], JSON.parse(this.productId)).subscribe((response: any[]) => {
        if (response.length) {
          this.isProductExistInWishlist = true;
        } else {
          this.isProductExistInWishlist = false;
        }
      })
    }
    this.getProductDetailById();
    this.buildDeliveryPincode();
    this.getReviewsOfProduct();
    this.buildReviewForm();
  }

  buildReviewForm() {
    this.addReview = this.builder.group({
      review: ['', Validators.required]
    })
  }

  buildDeliveryPincode() {
    this.deliveryPincode = this.builder.group({
      delivery_pincode: ['',Validators.required]
    })
  }

  // getProductDetailById() {
  //   if (this.productId) {
  //     this.productService.getProductById(this.productId).subscribe(res => {
  //       this.productObj = res;
  //       this.productThumbImage=this.productObj.thumbImages
  //       this.subTotal = this.productObj.sellingPrice;
  //       this.getProductListById(this.productObj['subCategoryId']);
  //     })
  //   } else {
  //     return;
  //   }
  // }
  getProductDetailById() {
    // this.productId = this.route.snapshot.params.id;
    // this.productKey = this.route.snapshot.params.productId;
      this.route.params.subscribe(params => {
        if(params['id']) {
          console.log(params['id']);
          console.log(params['productId']);
          this.productId = params['id'];
          this.productKey = params['productId'];
          console.log(this.productId);
          console.log(this.productKey);
        }
    })
    if (this.productKey) {
      this.pageLoaderService.startLoading();
      this.productService.getGroupedProducts(this.productKey).subscribe((res: any[]) => {
        console.log(this.productKey);
        this.products = res;
        console.log(this.products);
        console.log(typeof (this.products));
        // console.log(this.products['1'][0]['id']);


        // this.products = this.products[1];
        console.log(this.products.length);
        for (let index = 0; index < this.products[this.productKey].length; index++) {

          if (this.products[this.productKey][index]['id'] == this.productId) {

            this.selectedProductIndex = index;
            this.selectColor=index
            this.selectSize=index
            console.log(this.selectedProductIndex);
          }
          // if (this.products[this.productKey][index]['color']) {
          //   this.colors.push({
          //     index,
          //     hex: this.products[this.productKey][index]['color']['hex'],
          //     name: this.products[this.productKey][index]['color']['name']
          //   })
          // }
          if(this.products[this.productKey][index]['color']){
            this.colors.push({
              index,
              thumbImage:this.products[this.productKey][index]['thumbImages']
            })
          }

          if (this.products[this.productKey][index]['size']) {

            if(this.products[this.productKey][index]['size'].toUpperCase()==="FREE SIZE"){
                this.haveFreeSize=true
            }
            
            else{
              this.size.push({
                index,
                size: this.products[this.productKey][index]['size']
              })
            }            
            // console.log(this.size)
          }
        }
        this.productObj = this.products[this.productKey][this.selectedProductIndex];
        this.productSpecification=this.productObj['specifications']
        console.log(this.productObj);
        // console.log(this.productObj.images);

        // const images=this.productObj.images;
        // this.sideImages=images.split("| ");
        // console.log(this.sideImages[3]);
        // this.sizechartImg=this.sideImages[3];
        // this.sideImages=this.productObj.split

        this.productThumbImage = this.productObj.thumbImages
        console.log(this.productThumbImage);
        this.subTotal = this.productObj.sellingPrice;
       
        this.getProductListById(this.productObj['subCategoryId']);
        this.pageLoaderService.stopLoading();
      })
    } else {
      return;
    }
  }

  changeProductByColor(index){
    this.selectColor = index;
    const id=this.products[this.productKey][this.selectColor]['id'];
    this.productObj = this.products[this.productKey][this.selectColor];
    this.productThumbImage = this.productObj.thumbImages
    this.subTotal = this.productObj.sellingPrice;
    this.router.navigateByUrl(`app/products/detail/${id}/${this.productKey}`);
    // this.getProductListById(this.productObj['subCategoryId']);
  }

  changeProductBySize(index){
    this.selectSize = index;
    const id=this.products[this.productKey][this.selectSize]['id'];
    this.productObj = this.products[this.productKey][this.selectSize];
    this.productThumbImage = this.productObj.thumbImages
    this.subTotal = this.productObj.sellingPrice;
    this.router.navigateByUrl(`app/products/detail/${id}/${this.productKey}`);
    // this.getProductListById(this.productObj['subCategoryId']);
  }

  // changeProduct(index) {
  //   this.selectedProductIndex = index;
  //   this.productObj = this.products[this.selectedProductIndex];
  //   this.productThumbImage = this.productObj.thumbImages
  //   this.subTotal = this.productObj.sellingPrice;
  //   this.getProductListById(this.productObj['subCategoryId']);
  // }

  addToCart() {
    if (!this.cookie.get('cart')) {

      this.cartService.createCart().subscribe(res => {
        if (res['id']) {
          this.productObj['productId'] = JSON.parse(this.productId);
          this.productObj['cartId'] = res['id'];
          // this.productObj['status'] = 'active';
          this.showBuyNowBtn = true;
          const payload = {
            cartId: res['id'],
            productId: JSON.parse(this.productId),
            quantity: this.quantity,
            businessId: this.productObj['businessId']
          }
          this.cartService.createCartDetail(payload).subscribe(response => {
            try {
              this.cartService.getCart(res['id']).subscribe((res: any[]) => {
                this.cart=res
                this.isProductExist = true;
                this.share.cartDetails.next(this.cart)
                this.share.productCount.next(res.length);
                // this.share.setCartCount(res.length);
              })
              if(this.localStorageService.get('user-detail')){
                this.toastr.success('Product added to cart');
              }
            } catch (error) {
              this.toastr.error('Error,', error);
            }
          }, error => {
            this.toastr.error('Error,', error['error'].message);
          })
        }
        // this.cartService.getCart(res['id']).subscribe((resp: any[]) => {
        //   this.share.cartDetails.next(this.cart)
        //   this.share.productCount.next(resp.length);
        //   this.share.setCartCount(resp.length);
        // })
        this.cookie.set('cart', JSON.stringify({ id: res['id'] }), { expires: 365, path: '/' });
        if (this.cookie.get('cart') && !!localStorage.getItem('user-detail')) {
          let cartObj = JSON.parse(this.cookie.get('cart'));
          this.cartService.updateCart(cartObj['id'], { userId: this.userDetails.id }).subscribe(res => {
            console.log("cart updated");
          })
        }
      })
    } else {
      const cartObj = JSON.parse(this.cookie.get('cart'));
      this.productObj['productId'] = JSON.parse(this.productId);
      this.productObj['cartId'] = cartObj['id'];

      // this.productObj['status'] = 'active';
      this.showBuyNowBtn = true;
      const payload = {
        cartId: cartObj['id'],
        productId: JSON.parse(this.productId),
        quantity: this.quantity,
        businessId: this.productObj['businessId']
      }
      this.cartService.isProductExistInCart(cartObj['id'], JSON.parse(this.productId)).subscribe((response: any[]) => {
        if (!response.length) {
          this.isProductExist = false;
          this.cartService.createCartDetail(payload).subscribe(response => {
            this.cartService.getCart(cartObj['id']).subscribe((res: any[]) => {
              this.isProductExist = true;
              // this.cartService.cartItemCount.next(res.length);
              this.share.cartDetails.next(res)
              this.share.productCount.next(res.length);
            })
            // this.toastr.success('Product added successfully');
            if(this.localStorageService.get('user-detail')){
              this.toastr.success('Product added to cart');
            }
          })
        } else {
          this.isProductExist = true;
        }
      })
    }
  }

  buyNow() {
    if (!this.localStorageService.get('user-detail')) {
      // alert('User sign in or sign up is required!')
      this.warningModal.open();
      this.router.navigateByUrl("/login?status=buy")
    } 
    else {
      if (this.cookie.get('cart')) {
        const cartObj = JSON.parse(this.cookie.get('cart'));
        this.router.navigate(['/app/orders/place-order'], { queryParams: { id: cartObj['id'] } })
      } else if (!this.cookie.get('cart')) {
        this.cartService.createCart().subscribe(res => {
          if (res['id']) {
            this.productObj['productId'] = JSON.parse(this.productId);
            this.productObj['cartId'] = res['id'];
            // this.productObj['status'] = 'active';
            this.showBuyNowBtn = true;
            const payload = {
              cartId: res['id'],
              productId: JSON.parse(this.productId),
              quantity: this.quantity,
              businessId: this.productObj['businessId']
            }
            this.cartService.createCartDetail(payload).subscribe(response => {
              console.log(payload);
              console.log("response---", response);
              try {
                this.toastr.success('Product added successfully',);
              } catch (error) {
                this.toastr.error('Error,', error);
              }
            })
          }
          if (!this.cookie.get('cart')) {
            this.cookie.set('cart', JSON.stringify({ id: res['id'] }), { expires: 365, path: '/' });
          }
          if (this.cookie.get('cart')) {
            const cartObj = JSON.parse(this.cookie.get('cart'));
            this.router.navigate(['/app/orders/place-order'], { queryParams: { id: cartObj['id'] } })
          }
        })
      }
    }
  }

  addToWishList() {
    if (!this.localStorageService.get('user-detail')) {
      // alert('User sign in or sign up is required!')

      this.warningModal.open();
    }
    let payload;
    if (this.localStorageService.get('user-detail')) {
      payload = { userId: this.userDetail.id };

      if (!this.cookie.get('wishlist')) {
        console.log("the payload" + payload);
        this.wishlistService.createWishList(payload).subscribe(res => {
          if (res['id']) {
            const data = {
              wishlistId: res['id'],
              productId: JSON.parse(this.productId),
              quantity: this.quantity,
              businessId: this.productObj['businessId']
            }
            this.addToWishListDetails(data);
            this.cookie.set('wishlist', JSON.stringify({ id: res['id'] }), { expires: 365, path: '/' });
          }
        })
      } else if (this.cookie.get('wishlist')) {
        const data = {
          wishlistId: this.wishlistObj['id'],
          productId: JSON.parse(this.productId),
          quantity: this.quantity,
          businessId: this.productObj['businessId']
        }
        this.wishlistService.isProductExistInWishlist(this.wishlistObj['id'], JSON.parse(this.productId)).subscribe((response: any[]) => {
          if (!response.length) {
            this.isProductExistInWishlist = false;
            this.addToWishListDetails(data);
          } else {
            this.isProductExistInWishlist = true;
          }
        })
      }
    }
    if (!this.localStorageService.get('token')) {
      console.log("the local service ");
      // this.router.navigate(['/app/product/wishlist']);
      this.router.navigate(['/login']);
    }


    // else {
    //   this.warningModal.open();
    //   //console.log( this.warningModal.open());
    // }


  }

  get wishlistObj() {
    return JSON.parse(this.cookie.get('wishlist'));
  }

  addToWishListDetails(data) {
    this.wishlistService.createWishListDetail(data).subscribe(res => {
      this.isProductExistInWishlist = true;
      this.toastr.success('Successfully added to wishlist');
    }, error => {
      this.toastr.error('Some error occurred while adding to wishlist please try again');
    })
  }

  saveReview() {
    const payload = {
      comment: this.addReview.value.review,
      userId: this.userDetails.id,
      productId: Number(this.productId)
    }
    this.productService.saveProductReview(payload).subscribe(res => {
      this.toastr.success('review saved');
      this.getReviewsOfProduct();
    }, error => {
      this.toastr.error(error);
    })
  }

  increaseQuantity() {
    if (this.quantity != this.productObj.availableStock) {
      this.quantity = this.quantity + 1;
      this.subTotal = Math.round(this.productObj.sellingPrice * this.quantity);
     
    }
  }

  decreaseQuantity() {
    if (this.quantity != 1) {
      this.quantity = this.quantity - 1;
      this.subTotal = Math.round(this.productObj.sellingPrice * this.quantity);
      
    }
  }

  roundOffDiscount(value){
    return Math.round(value)
  }

  get userDetail() {
    return JSON.parse(this.localStorageService.get('user-detail'));
  }

  getProductListById(productId) { //productsubcategoryid=productid
    if (productId) {
      this.productService.getProductListById(productId).subscribe((res: any[]) => {

        console.log(res);
        let keys = Object.keys(res);
        for (let i of keys) {
          console.log(res[i]);
          for (let j = 0; j < res[i].length; j++) {
           
            this.productList.push(res[i][j]);
          }
        }
       console.log(this.productList);

        // if (res && res.length > 0) {
        //   console.log(res);
        //   this.productList = res;
        // console.log(this.productList)
        // }

      }, error => {
      })
    } else {
      this.productList = [this.productObj];
    }

  }
  /**
   * Method for setting dynamic background image url on the zoom overlay div when product image get clicked
   */
  setZoomOverlayUrl(productThumbImage:any) {
    document.getElementById('zoom-overlay').style.background = `url(${productThumbImage})`
    // console.log('document.getElementByIdstyle.background: ', document.getElementById('zoom-overlay').style.background);
  }

  openInDetailView(item) {
    console.log(item);
    this.router.navigate([`app/products/detail/${item.id}/${item.productId}`]);
  }

  get productImage() {
    return this.productObj.thumbImages;
  }

  goToCart() {
    this.router.navigateByUrl('/app/cart');
  }

  goToWishlist() {
    this.router.navigateByUrl('/app/wishlist');
  }

  changeProductImage(url) {
    this.productThumbImage = url
  }

  checkPincode(businessId:any){
    this.businessId = businessId;
    console.log(this.businessId);
    console.log(this.deliveryPincode.value.delivery_pincode);
    let pincode = this.deliveryPincode.value.delivery_pincode;
    if(this.deliveryPincode.value.delivery_pincode.match("^[1-9][0-9]{5}$") )
      {
        this.postDeliveryPincode(this.businessId,pincode);

      }
      else
      {
         this.pincode_check=!this.pincode_check;
         this.service_available=false;
      }

  }
  postDeliveryPincode(businessId,pincode) {
    this.deliverypincodeService.getDeliveryPincode(pincode, this.businessId).subscribe(res => {
      let response = res;
      console.log(response);
      this.service_available = true;
      this.pincode_check=false;
      let edd = 0;
      for (let i = 0; i < response["data"].available_courier_companies.length; i++) {
        
        let temp = Number(response["data"].available_courier_companies[i].estimated_delivery_days);

        if (i == 0) {
          edd = temp;
        }
        else {
          if (temp >= edd) {
            edd = temp;
          }
        }
      }


      var numOfDaysToAdd = edd + 2;
      var estimatedDate = new Date();
      estimatedDate.setDate(estimatedDate.getDate() + numOfDaysToAdd);
      console.log(estimatedDate);

      let dd = estimatedDate.getDate();

      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let month = months[estimatedDate.getMonth()];

      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[estimatedDate.getDay()];

      this.deliveryDate = dd + ' ' + month + ',' + day;
      console.log(this.deliveryDate);
    },err =>{
       
    });
  }

  previous() {
    if (((this.start - this.itemsPerPage) >= 0) && ((this.end - this.itemsPerPage) >= 4)) {
      this.start = this.start - this.itemsPerPage;
      this.end = this.end - this.itemsPerPage;
      this.showBuyNowBtn = true;
    }
  }

  next() {
    if (this.start == this.end - 4) {
      for (let j = this.start; j <= this.end; j++) {
        if (j == this.productList.length - 1) {
          this.showNextButton = false;
        }
        else {
          this.showNextButton = true;
        }
      }
      this.start = this.start + this.itemsPerPage;
      this.end = this.end + this.itemsPerPage;
    }
  }
  getReviewsOfProduct() {
    if (this.productId) {
      this.productService.getProductReviewById(this.productId).subscribe(response => {

        this.productReview = response;
        console.log("Reviews" + this.productReview);

        for (let index = 0; index < this.productReview.length; index++) {
          const element = this.productReview[index];
          // this.collectUsers.push(element.userId);
          this.productService.getUserDetailsById(element.userId).subscribe(res => {

            this.collectUsers = res;
            this.productReview[index].username = this.collectUsers.name
            this.productReview[index].profile = this.collectUsers.profileImage
          })
        }

      }, error => {
        console.log(error);
      })
    }
  }

  // openProductDetails(){
  //   this.panelOpenState=!this.panelOpenState;
  // }
openSizeChart(sizechartimg){
  window.open(sizechartimg, '_blank');
}
}
