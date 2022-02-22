import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordService } from '../shared/services/forgot-password.service';
import { UserProfileService } from '../shared/services/user-profile.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup = new FormGroup({});
  public generateOtpForm: FormGroup = new FormGroup({});
  public userInfo:any
  public isVisible: boolean = true;
  public pass_type: string = 'password';
  public pass_field: string = 'password';
  public showPassword: boolean = true;

  public otpForm: boolean = true;
  public otpBtn: boolean = true;
  public showResendOtp=false;
  public timerOn = true;
  public timeLeft:any
  public chanceRemaining=2
  public showTimer:boolean=true

  constructor(
    private builder: FormBuilder,
    private router: Router, private toastr: ToastrService,
    private forgetpassword: ForgotPasswordService,
    private userProfileUpdate:UserProfileService) { }

  ngOnInit(): void {
    this.buildResetPasswordForm();
    this.buildGenerateOtpForm();
  }

  buildGenerateOtpForm() {
    this.generateOtpForm = this.builder.group({
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^([6-9]{1})([0-9]{9})$")]],
      otp: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]]
    })
  }

  buildResetPasswordForm() {
    this.resetPasswordForm = this.builder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  resetPassword() {
    const payload={
      password: this.resetPasswordForm.value.password
    }
    if(this.resetPasswordForm.valid){
      if(this.resetPasswordForm.value.password!= this.resetPasswordForm.value.confirm_password){
        this.toastr.error('Confirm password is incorrect');
      }
      else{
        this.userProfileUpdate.updateUserRecord(payload,this.userInfo.id).subscribe(response => {
          console.log(response);
          this.toastr.success('Reset Password Successfully');
          this.router.navigateByUrl('/login')
        },
        error => {
          this.toastr.error(error);
        })
      }
    }


  }

  verifyOtp() {
    console.log(this.generateOtpForm.value.otp);
    const payload={
      mobile: this.generateOtpForm.value.mobile,
      otp: this.generateOtpForm.value.otp
    }

    if(this.generateOtpForm.valid){

      this.forgetpassword.verifyingOtp(payload).subscribe(response => {
        if(response['token']){
          let token=response['type']+" "+response['token']
          localStorage.setItem("user-details",atob(token.split('.')[1]));
          this.userInfo=JSON.parse(localStorage.getItem('user-details'))
          this.otpForm = false
        }
      },error => {
        if(error['error'].statusCode == 403){
          this.toastr.error('Invalid Otp');
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
    
    this.forgetpassword.generatingOtp(payload).subscribe(response => {
        console.log(response)
        this.toastr.success('OTP sent');
        this.otpBtn = false;
    },error => {
        if(error['error'].statusCode == 403){
          this.toastr.error('No user exist with this number');
        }else{
          this.toastr.error(error.error.message);
        }
    })

  }

  resendOtp(){
    
    // if(this.chanceRemaining==1){
    //   this.showResendOtp=false;
    // }

    const payload={
      mobile: this.generateOtpForm.value.mobile
    }
    this.forgetpassword.generatingOtp(payload).subscribe(response => {
        console.log(response)
        this.toastr.success('Otp have been sended');
        this.otpBtn = false;
        // this.chanceRemaining-=1;
    },error => {
        if(error['error'].statusCode == 403){
          this.toastr.error('Invalid Otp');
        }else{
          this.toastr.error(error.error.message);
        }
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

  validateFormField(type) {

    if (type == 'mobile') {
      if (this.generateOtpForm.value.mobile === '') {
        this.toastr.error("Mobile field is required");
      }
      else if (!(this.generateOtpForm.value.mobile.match("^([7-9]{1})([0-9]{9})$"))) {
        this.toastr.error("Please enter correct contact number")
      }

    }
    else if (type == 'password') {
      if (this.resetPasswordForm.value.password === '') {
        this.toastr.error("password field is required")
      }
      else if (this.resetPasswordForm.value.password.length < 8) {
        this.toastr.error(' password must be of 8 characters');
      }

    }
    else if (type == 'confirm') {
      if (this.resetPasswordForm.value.confirm_password === '') {
        this.toastr.error("confirm-password field is required");
      }
    }
    else if (type == 'otp') {
      if (this.generateOtpForm.value.otp.length > 4) {
        this.toastr.error("otp must contain only 4 digit");
      }
    }

  }


}
