import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../shared/services/register.service';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordService } from '../shared/services/forgot-password.service';
import { UserProfileService } from '../shared/services/user-profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});
  public generateOtpForm: FormGroup = new FormGroup({});
  public isVisible: boolean = true;
  public pass_type: string = 'password';
  public pass_field: string = 'password';
  public showPassword: boolean = true;
  public userInfo:any
  public checkOtp:any
  public contactNo:any
  public defaultImg="https://res.cloudinary.com/adixoo-com/image/upload/v1634230303/fwyhme0rbiqvtnr3tmt7.jpg"

  public otpForm: boolean=true;
  public otpBtn: boolean = true;
  public showResendOtp=false;
  public timerOn = true;
  public timeLeft:any
  public chanceRemaining=2
  public showTimer:boolean=true
  public disableButton:boolean= false
  public contactResponse:any;

  constructor(
    private builder: FormBuilder,
    private registerService: RegisterService,
    private router: Router, private toastr: ToastrService,
    private forgetpassword: ForgotPasswordService,
    private userProfileUpdate:UserProfileService,
    private activeRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.buildRegistrationForm();
    this.buildGenerateOtpForm();
    const otp=this.activeRoute.snapshot.queryParams.Otp
    if(otp === 'true'){
      this.otpForm=true
    }
    else{
      // this.otpForm=false
      this.router.navigateByUrl('/register?Otp=true')
    }
  }

  buildRegistrationForm() {
    this.registerForm = this.builder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
      mobile: [this.contactNo, [Validators.required, Validators.maxLength(10), Validators.minLength(10),Validators.pattern("[6789][0-9]{9}")]]
    })
  }

  buildGenerateOtpForm() {
    this.generateOtpForm = this.builder.group({
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[6789][0-9]{9}")]],
      otp: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]]
    })
  }

  showPass(type) {
    if (type == 'show') {
      this.showPassword = !this.showPassword;
      this.pass_field = 'text';
    } else if (type == 'hide') {
      this.showPassword = !this.showPassword;
      this.pass_field = 'password';
    }
  }

  showConfirmPass(type) {
    if (type == 'show') {
      this.isVisible = !this.isVisible;
      this.pass_type = 'text';
    } else if (type == "hide") {
      this.isVisible = !this.isVisible;
      this.pass_type = 'password';
    }
  }

  validateFormField(type) {
    if (type == 'name') {
      // console.log(this.registerForm.value.first_name.length)
      if(this.registerForm.value.first_name === '' )
      {
        this.toastr.error("Name field is required")

      }
      else if(!(this.registerForm.value.first_name.match("^[A-Za-z\s]{0,}$")))
      {
       this.toastr.error("Invalid First Name")
      }
      // if (this.registerForm.value.first_name.replace(/\s/g, "") === '') {
      //   this.registerForm.controls.first_name.patchValue(null)
      //   this.toastr.error("input is required")
      // }
      // console.log(this.registerForm.value.first_name.length);
      // if(this.registerForm.value.first_name.length== 0 )
      // {
      // }
    }
      
     else if (type == 'last_name') {
      // if (this.registerForm.value.last_name.replace(/\s/g, "") === '') {
      //   this.registerForm.controls.last_name.patchValue(null);
      // }
      if(this.registerForm.value.last_name === '' )
      {
        this.toastr.error("Last Name field is required")

      }
      else if( !(this.registerForm.value.last_name.match("^[A-Za-z\s]{0,}$")))
      {
       this.toastr.error("Invalid Last name")
      }
      
    } else if (type == 'email') {
      // if (this.registerForm.value.email.replace(/\s/g, "") === '') {
      //   this.registerForm.controls.email.patchValue(null);
      // }
      // let em=false;
      // console.log(em)
      console.log(this.registerForm.value.email)
      if(this.registerForm.value.email === '' )
      {
        this.toastr.error("Email field is required")

      }
      else  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.registerForm.value.email)))
      {
        this.toastr.error("You have entered an invalid email address!");
        // return (true)
      }
    }
      // else if(!(this.registerForm.value.email.match('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/')))
      // {
      //   this.toastr.error("email is wrong")
      //   em=true;
      // }
      // console.log(em)
      // if(email=false)
      // {
      //   this.toastr.error("email is wrong")
      // }
    
  
     else if (type == 'password') {

      // console.log(this.registerForm.value.password.length)
      // if (this.registerForm.value.password.replace(/\s/g, "") === '') {
      //   this.registerForm.controls.password.patchValue(null);

      // }
      if(this.registerForm.value.password === '' && this.registerForm.value.password.length < 8 )
      {
        this.toastr.error("password field is required")

      }
     else if( !(this.registerForm.value.password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")))
      {
        this.toastr.error('your password must be greater than 8 characters and must have one lowecase letter one upper-case letter number and special characters');
        
       }
      
    } else if (type == 'confirm') {
      // if (this.registerForm.value.confirm_password.replace(/\s/g, "") === '') {
      //   this.registerForm.controls.confirm_password.patchValue(null);
      // }
      if(this.registerForm.value.confirm_password === '' )
      {
        this.toastr.error("confirm-password field is required");
      }
      else if(!(this.registerForm.value.confirm_password === this.registerForm.value.password)){
        this.toastr.error("confirm-password and password does not match");
      }
    } else if (type == 'mobile') {
      if(this.registerForm.value.mobile === '' )
      {
        this.toastr.error("Mobile field is required");
        
      }
      
      else if(!(this.generateOtpForm.value.mobile.match("[6789][0-9]{9}") ))
      {
        this.disableButton = true;
       this.toastr.error("Please enter correct contact number")
      }
      else{
        this.disableButton  = false;
      }
  }
}

  
  createUser() {
    const payload = {
      firstName: this.registerForm.value.first_name,
      lastName: this.registerForm.value.last_name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      mobile: this.registerForm.value.mobile,
      profileImage:this.defaultImg
    }
    if (this.registerForm.value.password != this.registerForm.value.confirm_password) {
      this.toastr.error('Confirm password is incorrect');
    } else {
      this.registerService.createUser(payload).subscribe(response => {
        this.toastr.success('User Registered Successfully');
        this.registerForm.reset();
        this.router.navigateByUrl("/login");
      }, error => {
        if(error['error'].statusCode == 422){
          this.toastr.error('User already exist with this number');
        }else{
          this.toastr.error(error.error.message);
        }
      })
    }
  }

  generateOtp() {
    console.log(this.generateOtpForm.value.mobile);
    const payload={
      mobile: this.generateOtpForm.value.mobile
    }
    this.userProfileUpdate.getUserDetailsByContact(payload).subscribe(response=>
      {   
        this.contactResponse=response;
        console.log(this.contactResponse.length);
      
        if(this.contactResponse.length==1){
          this.toastr.error("your number is already registered");
        }
      if(this.contactResponse.length==0)
      {
        this.registerService.generatingOtp(payload).subscribe(response => 
        {
          console.log(response)
          this.toastr.success('OTP sent');
          this.otpBtn = false;
          },error => {
          if(error['error'].statusCode == 403){
          this.toastr.error('Invalid phone number');
          }else{
          this.toastr.error(error.error.message);
          }
        })
      }
     
    })
    

  }

  verifyOtp() {
    console.log(this.generateOtpForm.value.otp);
    const payload={
      mobile: this.generateOtpForm.value.mobile,
      otp: this.generateOtpForm.value.otp
    }

    if(this.generateOtpForm.valid){

      this.registerService.verifyingOtp(payload).subscribe(response => {
        // if(response['token']){
        //   let token=response['type']+" "+response['token']
        //   localStorage.setItem("user-details",atob(token.split('.')[1]));
        //   this.userInfo=JSON.parse(localStorage.getItem('user-details'))
        //   this.otpForm = false
        // }
        this.checkOtp=response;
        if(this.checkOtp.isValid){
          this.otpForm = false
          this.contactNo=this.generateOtpForm.value.mobile;
          this.buildRegistrationForm();
        }
        else{
          this.toastr.error('Incorrect Otp');
        }
        
      },error => {
        if(error['error'].statusCode == 403){
          this.toastr.error('No user exist with this number');
        }else{
          this.toastr.error(error.error.message);
        }
      })

    }
  }

  resendOtp(){
    
    // if(this.chanceRemaining==1){
    //   this.showResendOtp=false;
    // }

    const payload={
      mobile: this.generateOtpForm.value.mobile
    }
    this.registerService.generatingOtp(payload).subscribe(response => {
        console.log(response)
        this.toastr.success('Otp have been sended');
        this.otpBtn = false;
        // this.chanceRemaining-=1;
    },error => {
        if(error['error'].statusCode == 403){
          this.toastr.error('Invalid phone number');
        }else{
          this.toastr.error(error.error.message);
        }
    })
  }

  timer(remaining) {
    var m:any = Math.floor(remaining / 60);
    var s:any = remaining % 60;
    
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    // document.getElementById('timer').innerHTML = m + ':' + s;
    this.timeLeft=m+ ':' +s

    remaining -= 1;
    
    if(remaining >= 0 && this.timerOn) {
      setTimeout(() => {
           this.timer(remaining);
      }, 1000);
      return;
    }
  
    if(!this.timerOn) {
      // Do validate stuff here
      return;
    }
    
    // Do timeout stuff here
    // alert('Timeout for otp');
    this.showResendOtp=true;
    this.showTimer=false
  }

  navigateToTermsAndConditions(){
    let url=`app/terms-and-condition`;
    window.open(url, '_blank');
  }

  navigateToPrivacyPolicy(){
    let url=`app/privacy`;
    window.open(url, '_blank');
  }

  onlyNumberAllowed(event) :boolean{

      const charCode= ( event.which)?event.which: event.keycode;
      if(charCode >  31 && (charCode <48 || charCode > 57)){
        console.log('charcode resticed' ); 
          return false
      }
      return true;
  }

}
