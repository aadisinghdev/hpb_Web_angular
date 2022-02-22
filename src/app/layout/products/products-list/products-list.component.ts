import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WishlistService } from 'src/app/shared/services/wishlist.service.js';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import {UserProfileService} from 'src/app/shared/services/user-profile.service';
import { PageLoaderService } from 'src/app/shared/page-loader/page-loader.service';
import { bannersFilter } from '../banners-filter';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  /**
   * 
  */
  public products: any = [];
  public subCatId: number = 0;
  public subCatName: string = '';
  public catName: string = '';
  public section: string = '';
  public position: string = '';
  public productIds: string[] = [];
  public brandIds=[];
  public size=[];
  public colorIds=[];
  public priceIds=[];
  public discountIds=[];
  public isProductListLoaded: boolean = false;
  public isProductExistInWishlist:boolean=false
  public wishlistIcon:boolean=false
public filters : any;

  constructor(
    private productService: ProductService, private router: Router, private route: ActivatedRoute
    , private wishlistService: WishlistService, private cookie: CookieService,
    private toastr: ToastrService, private localStorageService: LocalStorageService,
    private userService: UserProfileService,
    private domSanitizer: DomSanitizer,
    private pageLoaderService: PageLoaderService) {
    // this.productService.currentProductStage.subscribe(res => {
    //   this.subCatId = res['item_id'];
    //   this.subCatName = res['item_name'];
    //   this.catName = res['category'];
    //   this.getProductsList();`
    //   this.sortProductList('low');
    // })
    // this is for routerLink on same component when only queryParameter changes
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  checkId:any=0;
  isIconShow=false;

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.sub_id) {
      this.subCatId = this.route.snapshot.queryParams.sub_id;
      this.subCatName = this.route.snapshot.queryParams['item_name'];
      this.catName = this.route.snapshot.queryParams['category'];
    }
    if (this.route.snapshot.queryParams.section && this.route.snapshot.queryParams.position ) {
      this.catName="Banner"
      this.subCatName=this.route.snapshot.queryParams['bannerName']
      this.section = this.route.snapshot.queryParams.section;
      this.position = this.route.snapshot.queryParams.position;
      this.applyBannerFilter();
    }
    // setTimeout(()=>{
      this.isProductListLoaded = true;
      console.log('this.isProductListLoaded: ', this.isProductListLoaded);
    // },5000);
    this.getProductsList();
    // this.sortProductList('low');

    if( this.userDetail.id != null){
      //console.log(this.userDetail.id)
      this.isIconShow=true;
    }

    if(JSON.parse(this.localStorageService.get('user-detail'))){
      this.wishlistIcon=true
    }
  }
  applyBannerFilter() {
    this.filters = bannersFilter[this.section][this.position];
    this.getProductsList();

  }


  getBrandIds(id){
    console.log("@output:"+id)
    this.brandIds=id;
    this.getProductsList()
  }

  getSizes(id){
    console.log("@output:"+id)
    this.size=id;
    this.getProductsList()
  }


  getColorIds(id){
    console.log("@output:"+id)
    this.colorIds=id;
    this.getProductsList()
  }

  getPriceIds(id){
    this.priceIds=id;
    this.getProductsList()
  }

  getDiscountIds(id){
    this.discountIds=id;
    this.getProductsList()
  }

  getProductsList() {
    
    if (this.subCatId || this.section) {
    this.pageLoaderService.startLoading();    

      this.productService.getProductsList(this.subCatId,this.colorIds,this.brandIds,this.priceIds,this.discountIds,this.size,this.filters).subscribe((response:[]) => {
        console.log(response);
        if(response){
          this.productIds = Object.keys(response)
          this.products = response;
           this.getWishlistDetail();
          try {
            this.productImgs(this.products[this.productIds[0]][0]['images'][0]);
          } catch (error) {
            this.productIds = []
            console.log("error >>>>>>>>>>",error);
            
          }
        }
        else{
          this.productIds = []
          this.products = [];
          console.log("No product are there");
        }
        this.pageLoaderService.stopLoading();
        
      })
    }
  }

  getProduct(productId){
    const product = this.products[productId] && this.products[productId][0]? this.products[productId][0]: {};
    return product;
  }
  getWishlistDetail() {
    if (this.cookie.get('wishlist')) {
      const wishlistObj = JSON.parse(this.cookie.get('wishlist'));
      this.wishlistService.fetchWishListDetails(wishlistObj.id).subscribe((res: any[]) => {
        if (res && res.length > 0) {
          for (let productId of this.productIds) {
            for (let j = 0; j < res.length; j++) {
              console.log(this.getProduct(productId)['id']);
              
              if (this.getProduct(productId)['id'] == res[j]['productId']) {
                this.getProduct(productId)['wishlist_id'] = res[j]['id'];
                this.getProduct(productId)['is_added_in_wishlist'] = true;
              }
            }
          }
        }
      })
    }
  }

  getWishListDetails(productId){
    const productDetail=this.getProduct(productId)
    if (this.cookie.get('wishlist')) {
      const wishlistObj = JSON.parse(this.cookie.get('wishlist'));
      this.wishlistService.fetchWishListDetails(wishlistObj.id).subscribe((res: any[]) => {
        if (res && res.length > 0) {
            for (let j = 0; j < res.length; j++) {
              if (productDetail.id == res[j]['productId']) {
                this.isProductExistInWishlist=true
              }
            } 
        }
      })
    }
    this.isProductExistInWishlist
  }

  removeProductFromWishlist(id) {
    this.wishlistService.deleteWishlistDetail(id).subscribe(res => {
      console.log("-success-- remove product");
      this.toastr.success('product remove from wishlist');
      this.isProductExistInWishlist=false
      this.getProductsList();
    }, error => {
      console.log("error remove product", error);
    })
  }

  filterProductData(payload , filter) {
    this.productService.filterProductsList(payload,filter).subscribe(response => {
      // this.products = response;
      this.productIds = Object.keys(response)
      this.products = response;
    })
  }

  showProductDetailView(id,productId) {
    // const url = this.router.serializeUrl(
    //   this.router.createUrlTree([`app/products/detail/${id}/${productId}`])
    // );
    const url=`app/products/detail/${id}/${productId}`
  
    window.open(url, '_blank');
    // console.log(productId);
    // console.log(id);
    // console.log(productId)
    // this.router.navigateByUrl(`app/products/detail/${id}/${productId}`)
  }

  sortProductList(type) {
    let filterOptions = {};
    switch (type) {
      case ('feature'): {
        filterOptions = { subCategoryId: this.subCatId, isFeatured: true };
        this.filterProductData(filterOptions,this.filters);
        break;
      }
      case ('low'): {
        filterOptions = { subCategoryId: this.subCatId, sort: { by: 'sellingPrice', type: 'ASC' } };
        this.filterProductData(filterOptions,this.filters);
        break;
      }
      case ('high'): {
        filterOptions = { subCategoryId: this.subCatId, sort: { by: 'sellingPrice', type: 'DESC' } };
        this.filterProductData(filterOptions,this.filters);
        break;
      }
      case ('new'): {
        filterOptions = { subCategoryId: this.subCatId, sort: { by: 'createdAt', type: 'DESC' } };
        this.filterProductData(filterOptions,this.filters);
        break;
      }
      default: {
        break;
      }
    }
  }

  
  addToWishList(product) {
      
      console.log('the details'+this.userDetail.id);
      console.log("list",this.products);
      console.log('product: ', product);
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
              productId: product['id'],
              quantity: 1,
              businessId: product['businessId']
            }
            this.addToWishListDetails(data);
            this.cookie.set('wishlist', JSON.stringify({ id: res['id'] }), { expires: 365, path: '/' });
          }
        })
      } else if (this.cookie.get('wishlist')) {
        const data = {
          wishlistId: this.wishlistObj['id'],
          productId: product.id,
          quantity: 1,
          businessId: product['businessId']
        }
        this.wishlistService.isProductExistInWishlist(this.wishlistObj['id'], product['id']).subscribe((response: any[]) => {
          if (!response.length) {
            this.addToWishListDetails(data);
          } else {
              this.getProductsList();
          }
        })
      } 
   }
  addToWishListDetails(data) {
    console.log('data: ', data);
    this.wishlistService.createWishListDetail(data).subscribe(res => {
      this.getProductsList();
      this.isProductExistInWishlist=true
      this.toastr.success('Successfully added to wishlist');
    }, error => {
      this.toastr.error('Some error occurred while adding to wishlist please try again');
    })
  }

  get userDetail() {
    return JSON.parse(this.localStorageService.get('user-detail'));
  }

  get wishlistObj() {
    return JSON.parse(this.cookie.get('wishlist'));
  }

  roundOffDiscount(value){
    return Math.round(value)
  }
  
  productImgs(img){
    let imgUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(img);
    // console.log('imgUrl: ', imgUrl['changingThisBreaksApplicationSecurity']);
    return imgUrl['changingThisBreaksApplicationSecurity'];
  }

  

}
