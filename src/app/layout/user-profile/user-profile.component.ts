import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ShareDataService } from 'src/app/shared/services/share-data.service'
import { PincodeService } from 'src/app/shared/services/pincode.service';
import { PageLoaderService } from 'src/app/shared/page-loader/page-loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'yaari-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userForm: FormGroup = new FormGroup({});
  public userObj: any = {};
  public activeTab: string = 'profile';
  public imgUrl: string = '';
  public isUserAddress = false;
  public userAddress: any={};
  public removeProfilebtn:boolean=false
  public defaultImg="https://res.cloudinary.com/adixoo-com/image/upload/v1634230303/fwyhme0rbiqvtnr3tmt7.jpg"

  constructor(private toastr: ToastrService, private builder: FormBuilder, private localStorageService: LocalStorageService,
    private userService: UserProfileService, private addressService: AddressService,
    private service : PincodeService,
    private share:ShareDataService,
    private pageLoaderService: PageLoaderService,
    private router: Router) { }

  ngOnInit(): void {

    this.getUserRecord();
    this.buildUserForm();
  }

  
  pincodeAutofill(){
  
    this.service.pincode(this.userForm.value.pincode).subscribe((res : any)=>{
      let pincodeRes = res;
      console.log(pincodeRes);
      if((pincodeRes[0].Status == "Error")){
        console.log("Invalid Pincode");
        this.toastr.error("Invalid pincode");
      }
      else{
      //  this.cityName=pincodeRes[0].PostOffice[0].District;
      //   this.stateName=pincodeRes[0].PostOffice[0].State;
  
       this.userForm.controls['city'].setValue(pincodeRes[0].PostOffice[0].District);
       this.userForm.controls['state'].setValue(pincodeRes[0].PostOffice[0].State);
  
      // this.userForm.value.city=this.cityName;
      // this.userForm.value.state=this.stateName;
      console.log(pincodeRes[0].PostOffice[0].District);
      console.log(pincodeRes[0].PostOffice[0].State);
      console.log(pincodeRes[0].Status);
      
      }
     
    })
  }

  get userData() {
    return JSON.parse(this.localStorageService.get('user-detail'));
  }

  buildUserForm() {
    this.userForm = this.builder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      mobile: ['',  [Validators.required, Validators.maxLength(10), Validators.minLength(10),Validators.pattern("^[0-9]*$")]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]]
    })
  }

  get UForm() {
    return this.userForm.controls;
  }

  getUserRecord() {
    // this.pageLoaderService.startLoading();    
    // this.addressService.getAddressByUserId(this.userData.id).subscribe((response: any[]) => {
     this.userService.getUserDetailsById(this.userData.id).subscribe((response:any[])=>{
     if (response) {
      // this.pageLoaderService.stopLoading();
        this.userObj = response;
        console.log(this.userObj);
        this.imgUrl = this.userObj['profileImage'];
        console.log(this.imgUrl);
         this.share.profileImage.next(response['profileImage'])
        this.UForm.first_name.patchValue(this.userObj.firstName);
        this.UForm.last_name.patchValue(this.userObj.lastName);
        this.UForm.email.patchValue(this.userObj.email);
        this.UForm.mobile.patchValue(this.userObj.mobile);
        this.addressService.getAddressByUserId(this.userData.id).subscribe((addressResponse: any[]) =>{
          if(addressResponse && addressResponse.length){
            this.isUserAddress = true;
        this.userAddress=addressResponse[0];
        this.UForm.city.patchValue(this.userAddress.city);
        this.UForm.state.patchValue(this.userAddress.state);
        this.UForm.pincode.patchValue(this.userAddress.pinCode);
        this.UForm.address.patchValue(this.userAddress.address);
        console.log("0this-", this.UForm);
        if(this.imgUrl===this.defaultImg){
          this.removeProfilebtn=true
        }
        else{
          this.removeProfilebtn=false
        }
       
      }
      else{
        if(this.imgUrl===this.defaultImg){
          this.removeProfilebtn=true
        }
        else{
          this.removeProfilebtn=false
        }
      }
        
        } ) 
      } else {
        // this.userService.getUserDetails().subscribe((response: any[]) => {
          
        //   this.userObj = response;
        //   this.imgUrl = this.userObj['profileImage'];
        //   this.UForm.first_name.patchValue(this.userObj.user.firstName);
        //   this.UForm.last_name.patchValue(this.userObj.user.lastName);
        //   this.UForm.email.patchValue(this.userObj.user.email);
        //   this.UForm.mobile.patchValue(this.userObj.user.mobile);
        // }, error => {
        //   console.log("user details error",error);  
        // })
      }
      // this.pageLoaderService.stopLoading();
    }, error => {
      // this.pageLoaderService.stopLoading();
      console.log("uuuuser========", error);
      
    })
  }

  removeProfile(){
    this.pageLoaderService.startLoading()
    this.imgUrl=this.defaultImg
    let payload={
      profileImage:this.defaultImg
    }
    this.userService.updateUserRecord(payload,this.userData.id).subscribe( res => {
        this.toastr.success("Profile have been removed")
        this.removeProfilebtn=true
        this.share.profileImage.next(this.defaultImg);
        this.pageLoaderService.stopLoading()
    })
  }

  updateUser() {
    const payload = {
      firstName: this.userForm.value.first_name,
      
      lastName: this.userForm.value.last_name,
      email: this.userForm.value.email,
      mobile: this.userForm.value.mobile,
      profileImage: this.imgUrl
    }

    const addressPayload = {
      name: this.userObj.name,
      address: this.userForm.value.address,
      city: this.userForm.value.city,
      state: this.userForm.value.state,
      pinCode: this.userForm.value.pincode,
      userId : this.userObj.id,
      country: "India"
    }

    this.userService.updateUserRecord(payload, this.userData.id).subscribe(response => {

      if(this.isUserAddress){
        this.addressService.updateUserAddress(addressPayload, this.userAddress.id).subscribe(res => {
          this.toastr.success('Profile Updated Successfully');
          if(this.imgUrl===this.defaultImg){
            this.removeProfilebtn=true
          }
          else{
            this.removeProfilebtn=false
          }
          this.share.profileImage.next(this.imgUrl)

        }, err => {
          this.toastr.error(err, "Address");
        })
      }else{
        this.addressService.createNewAddress(addressPayload).subscribe(res => {
          this.toastr.success('Profile Updated Successfully');
          if(this.imgUrl===this.defaultImg){
            this.removeProfilebtn=true
          }
          else{
            this.removeProfilebtn=false
          }
          this.share.profileImage.next(this.imgUrl)
        }, err => {
          this.toastr.error(err, "Address");
        })
      }
      
    }, error => {
      this.toastr.error(error);
    })
  }

  validateFormField(type) {
   
    if (type == 'name') {
      if((this.userForm.value.address === '')){
        this.toastr.error('First Name field cannot be empty');
      }
    /*  if (this.userForm.value.first_name.replace(/\s/g, "") === '') {
        this.userForm.controls.first_name.patchValue(null);
      }
       */
    } else if (type == 'last_name') {
      if((this.userForm.value.address === '')){
        this.toastr.error('Last Name field cannot be empty');
      }
     /* if (this.userForm.value.last_name.replace(/\s/g, "") === '') {
        this.userForm.controls.last_name.patchValue(null);
      }
       */
    } else if (type == 'email') {
      if (this.userForm.value.email.replace(/\s/g, "") === '') {
        this.userForm.controls.email.patchValue(null);
      }
    } else if (type == 'mobile') {
      if (this.userForm.value.mobile.replace(/\s/g, "") === '') {
        this.userForm.controls.mobile.patchValue(null);
      }
      if(!(this.userForm.value.mobile.match("^([7-9]{1})([0-9]{9})$"))){
        this.toastr.error('Invalid mobile number');
      }
    } else if (type == 'state') {
      if((this.userForm.value.address === '')){
        this.toastr.error('State field cannot be empty');
      }
      /* if (this.userForm.value.state.replace(/\s/g, "") === '') {
        this.userForm.controls.state.patchValue(null);
      }
      */
    } else if (type == 'city') {
      if((this.userForm.value.address === '')){
        this.toastr.error('City field cannot be empty');
      }
     /* if (this.userForm.value.city.replace(/\s/g, "") === '') {
        this.userForm.controls.city.patchValue(null);
      }
      */
    } else if (type == 'pincode') {
      if (this.userForm.value.pincode.replace(/\s/g, "") === '') {
        this.userForm.controls.pincode.patchValue(null);
      }
      if(!(this.userForm.value.pincode.match("^[1-9][0-9]{5}$"))){
        this.toastr.error('Invalid pincode');
    }
    } else if (type == 'address') {
      if((this.userForm.value.address === '')){
        this.toastr.error('Invalid Address');
      }
     /*
      if (this.userForm.value.address.replace(/\s/g, "") === '') {
        this.userForm.controls.address.patchValue(null);
      }
 */
    }
  }

  systemFilesPicked(ev) {
    let file: File = ev[0];
    let formData: FormData = new FormData();
    console.log("file.name", file.name);
    formData.append('files', file, file.name);
    console.log("formData", formData);
    this.userService.uploadProfilePhoto(formData).subscribe(res => {
      if (res['files'][0]['path']) {
        this.imgUrl = res['files'][0]['path']
      }
    })
  }
}
