import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../shared/services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { PreviousRouteService } from '../shared/services/previous-route.service';
import { ShareDataService } from '../shared/services/share-data.service';
import { WishlistService } from '../shared/services/wishlist.service';
import { UserProfileService } from '../shared/services/user-profile.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});
  public previousUrl: any = '';
  constructor(private builder: FormBuilder, private route : ActivatedRoute,private loginService: LoginService,
    private router: Router, private localStorageService: LocalStorageService,
    private toastr: ToastrService, private cartService: CartService,
    private cookie: CookieService, private previousRouteService: PreviousRouteService,
    private share:ShareDataService,private wishlistService:WishlistService,
    private userService:UserProfileService) { }

  ngOnInit(): void {
    this.previousUrl = this.previousRouteService.getPreviousUrl();
    console.log('this.previousUrl: ', this.previousUrl);
    this.buildLoginForm();

    // if(this.route.snapshot.queryParams.status){

    // }

  }

  buildLoginForm() {
    this.loginForm = this.builder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])
    })
  }

  checkUser() {
    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    if (this.lForm.valid) {
      this.loginService.loginUser(payload).subscribe(res => {
        if (res['token']) {
          let token = res['type'] + ' ' + res['token'];
          this.localStorageService.set('token', token);
          this.localStorageService.set('user-detail', atob(res['token'].split('.')[1]));
          let user = JSON.parse(this.localStorageService.get('user-detail'));
            this.userService.getUserDetailsById(user.id).subscribe((response:any[])=>{
              
              this.share.profileImage.next(response['profileImage'])
            }, 
            error => {
            console.log("uuuuser========", error);
           })
          
          this.cartService.getCartWithUserId(user.id).subscribe((res: any[]) => {
            if (res.length > 0) {
              if (this.cookie.get('cart')) {
                let cartObj = JSON.parse(this.cookie.get('cart'));
                if (cartObj.id == res[0]['id']) {
                  return;
                } else {
                  // this.cookie.deleteAll();
                  // this.cookie.set('cart', JSON.stringify({ id: res[0]['id'] }), { expires: 365, path: '/' });
                  const payload={
                    oldCartId:cartObj.id,
                    newCartId:res[0]['id']
                  }
                  this.cartService.mergeCart(payload).subscribe((res:any)=> {
                    console.log(res)
                    this.cookie.set('cart', JSON.stringify({ id: res['cartId'] }), { expires: 365, path: '/' });
                    let cartObj = {};
                    if (this.cookie.get('cart')) {
                      cartObj = JSON.parse(this.cookie.get('cart'));
                      console.log("cartObj="+cartObj);
                      if (cartObj) {
                        this.cartService.getCart(cartObj['id']).subscribe((response: any[]) => {
                          this.share.productCount.next(response.length)
                          this.share.cartDetails.next(response)

                          if(this.route.snapshot.queryParams.status){

                            this.toastr.success('Product added to cart');
                            this.router.navigate(['/app/cart']);
                          }

                        })
                      }
                    } 
                  })
                }
              }else{
                 console.log("rs",res[0]);
                 this.cookie.set('cart', JSON.stringify({ id: res[0]['id'] }), { expires: 365, path: '/' });  
              }
              //  this.share.productCount.next(res)

              let cartObj = {};
              if (this.cookie.get('cart')) {
                cartObj = JSON.parse(this.cookie.get('cart'));
                console.log("cartObj="+cartObj);
                if (cartObj) {
                  this.cartService.getCart(cartObj['id']).subscribe((response: any[]) => {
                    this.share.productCount.next(response.length)
                    this.share.cartDetails.next(response)
                  })
                }
              } 
              
            } 
            else if (!res.length) {
              if (this.cookie.get('cart')) {
                let cartObj = JSON.parse(this.cookie.get('cart'));
                this.cartService.updateCart(cartObj['id'], { userId: user.id }).subscribe(res => {
                  console.log("cart updated");
                })
              } else {
                this.cartService.createCartWithUserId(user.id).subscribe(response => {
                  console.log("cart created with user id");
                  this.cookie.set('cart', JSON.stringify({ id: response['id'] }), { expires: 365, path: '/' });
                })
              }
            }
          })

          this.wishlistService.getWishlistByUserId(user.id).subscribe((res:any[]) => {
            if (res.length > 0) {
              if (this.cookie.get('wishlist')) {
                let wishlistObj = JSON.parse(this.cookie.get('wishlist'));
                if (wishlistObj.id == res[0]['id']) {
                  return;
                } else {
                   this.cookie.deleteAll();
                   this.cookie.set('wishlist', JSON.stringify({ id: res[0]['id'] }), { expires: 365, path: '/' });
                   
                }
              }else{
                 console.log("rs",res[0]);
                 this.cookie.set('wishlist', JSON.stringify({ id: res[0]['id'] }), { expires: 365, path: '/' });  
              }
                
            } 
            else if (!res.length) {
              if (this.cookie.get('wishlist')) {
                let cartObj = JSON.parse(this.cookie.get('wishlist'));
                this.wishlistService.updateWislist(cartObj['id'], { userId: user.id }).subscribe(res => {
                  console.log(res);
                })
              } else {
                this.wishlistService.createWishlistWithUserId(user.id).subscribe(response => {
                  console.log(res);
                  this.cookie.set('wishlist', JSON.stringify({ id: response['id'] }), { expires: 365, path: '/' });
                })
              }
            }
          })
          console.log(this.previousUrl);
          
          if(!this.route.snapshot.queryParams.status){
           
            if (this.previousUrl.includes('/login')) {
              this.router.navigate(['/home']);
            }
            else if(this.previousUrl.includes('/forget_password')){
              this.router.navigate(['/home'])
            }
            else {
              if(!this.previousUrl.includes('register')){
                this.router.navigate([this.previousUrl]);
              }else{
                this.router.navigate(['/home']);
              }
            }
          }

          
        }
      }, error => {
        this.toastr.error('Invalid', 'The email and password you entered did not match our records. please check and try again');
      })
    }
  }

  get lForm() {
    return this.loginForm;
  }

  validateFormField(type) {
    if (type == 'email') {
      // if (this.loginForm.value.email.replace(/\s/g, "") === '') {
      //   this.loginForm.controls.email.patchValue(null);
      // }

      if(this.loginForm.value.email === '' )
      {
        this.toastr.error("Email field is required")

      }
      else  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.loginForm.value.email)))
      {
        this.toastr.error("You have entered an invalid email address!");
        // return (true)
      }
    
    } else if (type == 'password') {
      // if (this.loginForm.value.password.replace(/\s/g, "") === '') {
      //   this.loginForm.controls.password.patchValue(null);
      // }
      if(this.loginForm.value.password === '' )
      {
        this.toastr.error("password field is required")

      }
      // else{
      //   this.toastr.error("You have entered an Invalid password")
      // }
    }
  }
}
