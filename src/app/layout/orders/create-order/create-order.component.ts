import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ShareDataService } from 'src/app/shared/services/share-data.service';
import { PincodeService } from 'src/app/shared/services/pincode.service';
import { PageLoaderService } from 'src/app/shared/page-loader/page-loader.service';
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class CreateOrderComponent implements OnInit {
  @ViewChild('addAddress') addAddress;
  @ViewChild('payLaterOrderSummary') payLaterOrderSummary;
  @ViewChild('paylaterConfirmationModal') paylaterConfirmationModal;
  public cartId: any = 0;
  public cartDetails: any = [];
  public totalPrice: any = 0;
  public totalDiscount: any = 0;
  public totalAmount: any = 0;
  public totalQuantity: any = 0;
  public addressForm: FormGroup = new FormGroup({});
  public userAddress: any = [];
  public formType: string = "Add Address"
  public modalRef: NgbModalRef;
  public editModeAddressId: any = 0;
  public isPayLaterClicked: boolean = false;
  public couponCode: string = '';
  public coupon_code_check = 'HPB50';
  public deliveryCharges: any = 0;
  public isCouponApplied : boolean = false;
  public cityName : string ='';
  public stateName : string='';
  public havePromoCode:boolean=false

  constructor(private cartService: CartService, private route: ActivatedRoute, private modalService: NgbModal,
    private formBuilder: FormBuilder, private localStorageService: LocalStorageService,
    private addressService: AddressService, private orderService: OrderService,
    private cookie: CookieService, private router: Router,
    private toastr: ToastrService,private share:ShareDataService,private service : PincodeService,
    private pageloader: PageLoaderService) {
    if (this.route.snapshot.queryParams.id) {
      this.cartId = this.route.snapshot.queryParams.id;
    }
  }

  ngOnInit(): void {
    this.getCartDetail();
    this.getUserAddress();
    this.buildAddAddressForm();
    
  }

  pincodeAutofill(){
  
    this.service.pincode(this.addressForm.value.pincode).subscribe((res : any)=>{
      let pincodeRes = res;
      console.log(pincodeRes);
      if((pincodeRes[0].Status == "Error")){
        console.log("Invalid Pincode");
        this.toastr.error("Invalid pincode");
      }
      else{
      //  this.cityName=pincodeRes[0].PostOffice[0].District;
      //  this.stateName=pincodeRes[0].PostOffice[0].State;
        this.addressForm.controls['city'].setValue(pincodeRes[0].PostOffice[0].District);
        this.addressForm.controls['state'].setValue(pincodeRes[0].PostOffice[0].State);
  
      // this.addressForm.value.city=this.cityName;
      // this.addressForm.value.state=this.stateName;
      console.log(pincodeRes[0].PostOffice[0].District);
      console.log(pincodeRes[0].PostOffice[0].State);
      console.log(pincodeRes[0].Status);
      
      }
     
    })
  }

  getCartDetail() {
    this.pageloader.startLoading();
    this.cartService.getCart(this.cartId).subscribe(res => {
      try {
        this.cartDetails = res;
        this.setTotalAmount(); 
        this.pageloader.stopLoading();
      } catch (error) {
        console.log("=---err---", error);
      }
    })
  }

  setTotalAmount() {
    for (let ele of this.cartDetails) {
      this.totalQuantity += ele.quantity;
      this.totalPrice += Math.round(ele.product.price * ele.quantity);
      this.totalDiscount += Math.round((ele.product.price * ele.quantity) - (ele.product.sellingPrice * ele.quantity));
    }
    this.totalAmount = Math.round(this.totalPrice - this.totalDiscount);
    if (this.totalAmount < 500) {
      this.deliveryCharges = 100;
      this.totalAmount = this.totalAmount + this.deliveryCharges;
      this.havePromoCode=false
    } else {
      this.deliveryCharges = 0;
      this.havePromoCode=true
    }
    console.log("quantity after", this.totalAmount);
  }

  addAddressModal() {
    this.buildAddAddressForm()
    this.modalRef = this.modalService.open(this.addAddress, { backdrop: 'static', keyboard: false, centered: true })
  }

  closeModal() {
    this.editModeAddressId = 0;
    this.addressForm.reset();
    this.modalRef.close();
  }

  buildAddAddressForm() {
    this.addressForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('',[Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      state: new FormControl('',[Validators.required]),
      country: new FormControl('India', [Validators.required]),
    })
  }

  addUserAddress() {
    const payload = {
      name: this.addressForm.value.name,
      address: this.addressForm.value.address,
      city: this.addressForm.value.city,
      state: this.addressForm.value.state,
      pinCode: this.addressForm.value.pincode,
      country: this.addressForm.value.country,
      userId: this.userDetails.id
    }

    if (this.formType == 'Add Address') {
      this.addressService.createNewAddress(payload).subscribe(res => {
        try {
          this.userAddress = res;
          this.getUserAddress();
          this.closeModal();
        } catch (error) {
        }
      })
    } else {
      this.addressService.updateUserAddress(payload, this.editModeAddressId).subscribe(res => {
        try {
          this.userAddress = res;
          this.getUserAddress();
          this.closeModal();
        } catch (error) {
        }
      })
    }

  }

  getUserAddress() {
    this.addressService.getAddressByUserId(this.userDetails.id).subscribe((res: any[]) => {
      try {
        this.userAddress = res;
      } catch (error) {
      }
    })
  }

  editAddress(item) {
    this.formType = "Edit Address";
    this.editModeAddressId = item.id;
    this.modalRef = this.modalService.open(this.addAddress, { backdrop: 'static', keyboard: false });
    this.addFrm.name.patchValue(item.name);
    this.addFrm.address.patchValue(item.address);
    this.addFrm.city.patchValue(item.city);
    this.addFrm.state.patchValue(item.state);
    this.addFrm.pincode.patchValue(item.pinCode);
    this.addFrm.country.patchValue(item.country);
  }

  get addFrm() {
    return this.addressForm.controls;
  }

  get userDetails() {
    return JSON.parse(this.localStorageService.get('user-detail'));
  }

  createOrder() {
    if (this.cookie.get('cart')) {
      const cartObj = JSON.parse(this.cookie.get('cart'));
      const userObj = JSON.parse(this.localStorageService.get('user-detail'));
      const payload = {
        cartId: cartObj['id'],
        addressId: 5,
        cartDetails:this.cartDetails,
        userId: userObj['id'],
        cartDetail:this.cartDetails,
        
        coupon : this.isCouponApplied ? this.isCouponApplied : false
      }
      this.orderService.createOrder(payload).subscribe(res => {
        console.log(res);
        // let data = { status: 'closed' };
        // this.cartService.updateCart(cartObj['id'], data).subscribe((res: []) => {
        //   console.log('res: ', res);
        //   this.cookie.delete('cart', '/');
        //   this.cartService.cartItemCount.next(0);
        // })
        this.router.navigate(['/app/orders/checkout'], { queryParams: { txnToken: res['txnToken'], orderNumber: res['order']['orderNumber'] } })
      }, error => {
        this.toastr.error(error['error']['message']);
      })
    }
  }

  payLaterConfirmationModal(){
      this.modalRef = this.modalService.open(this.paylaterConfirmationModal ,{ backdrop: 'static', keyboard: false, centered: true });
  }


  createPayLaterOrder() {
    if (this.cookie.get('cart')) {
      this.isPayLaterClicked = true;
      const cartObj = JSON.parse(this.cookie.get('cart'));
      const userObj = JSON.parse(this.localStorageService.get('user-detail'));
      const payload = {
        cartId: cartObj['id'],
        addressId: 5,
        cartDetails:this.cartDetails,
        userId: userObj['id'],
        payLater: true,
        coupon : this.isCouponApplied ? this.isCouponApplied : false
      }
      this.orderService.createOrder(payload).subscribe(res => {
        this.toastr.success('Order created successfully');
        let data = { status: 'closed' };
         this.cartService.updateCart(cartObj['id'], data).subscribe((res: []) => {
           console.log('res: ', res);
           this.modalRef = this.modalService.open(this.payLaterOrderSummary, { windowClass : 'orderSummary' ,backdrop: 'static', keyboard: false, centered: true })
           this.router.navigateByUrl('/home');
           this.cookie.delete('cart', '/')
           this.share.productCount.next(0)
           this.share.cartDetails.next("")
         })
                  
      }, error => {
        this.toastr.error(error['error']['message']);
      })
    }
  }

  validateFormField(type) {
    if (type == 'name') {
      if (this.addressForm.value.name.replace(/\s/g, "") === '') {
        this.addressForm.controls.name.patchValue(null);
      }
    } else if (type == 'address') {
      if (this.addressForm.value.address.replace(/\s/g, "") === '') {
        this.addressForm.controls.address.patchValue(null);
      }
    } else if (type == 'city') {
      if (this.addressForm.value.city.replace(/\s/g, "") === '') {
        this.addressForm.controls.city.patchValue(null);
      }
    } else if (type == 'pincode') {
      if (this.addressForm.value.pincode.replace(/\s/g, "") === '') {
        this.addressForm.controls.pincode.patchValue(null);
      }
    } else if (type == 'state') {
      if (this.addressForm.value.state.replace(/\s/g, "") === '') {
        this.addressForm.controls.state.patchValue(null);
      }
    }
  }

  applyCouponCode() {
    if (this.couponCode != '') {
      if (this.couponCode == this.coupon_code_check) {
        this.totalDiscount = 0;
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.setTotalAmount();
        this.totalAmount = Math.round(this.totalAmount / 2);
        this.totalDiscount = Math.round(this.totalAmount + this.totalDiscount+this.deliveryCharges);
        this.isCouponApplied = true;
        if(this.totalAmount < 500){
            this.deliveryCharges = 100;
            this.totalAmount = this.totalAmount + this.deliveryCharges;
        }
      } else {
        this.toastr.error('Invalid coupon code');
      }
    } else {
      this.toastr.error('Invalid coupon code');
    }
  }
}
