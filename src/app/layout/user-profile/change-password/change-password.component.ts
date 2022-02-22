import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from "src/app/shared/services/login.service";
@Component({
  selector: 'yaari-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public userForm: FormGroup = new FormGroup({});
  public userObj: any = {};
  public activeTab: string = 'profile';
  constructor(private loginService: LoginService, private toastr: ToastrService, private builder: FormBuilder, private localStorageService: LocalStorageService, private userService: UserProfileService, private addressService: AddressService) { }


  ngOnInit(): void {
    this.getUserRecord();
    this.buildPasswordForm();
  }

  get userData() {
    return JSON.parse(this.localStorageService.get('user-detail'));
  }

  buildPasswordForm() {
    this.userForm = this.builder.group({
      old_password: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  get UForm() {
    return this.userForm.controls;
  }

  getUserRecord() {
    this.addressService.getAddressByUserId(this.userData.id).subscribe(response => {
      this.userObj = response[0];
    }, error => {
      console.log("uuuuser========", error);
    })
  }

  changePassword() {
    const payload = {
      password: this.userForm.value.password,
    }
    if (this.userForm.value.password != this.userForm.value.confirm_password) {
      this.toastr.error('Confirm password is not same');
    } else {
      this.loginService.loginUser({ email: this.userData.email, password: this.userForm.value.old_password }).subscribe(response => {
        if (response['token']) {
          this.userService.updateUserRecord(payload, this.userData.id).subscribe(response => {
            this.toastr.success('Password updated successfully');
          }, error => {
            console.log("====err=r====", error);
            this.toastr.error(error);
          })
        }
      }, error => {
        this.toastr.error("Incorrect old password");
      })
    }
  }

  validateFormField(type) {
    if (type === 'old') {
      if (this.userForm.value.old_password.replace(/\s/g, "") === '') {
        this.userForm.controls.old_password.patchValue(null);
      }
    } else if (type === 'new') {
      if (this.userForm.value.password.replace(/\s/g, "") === '') {
        this.userForm.controls.password.patchValue(null);
      }
      else if(this.userForm.value.password === '' )
      {
        this.toastr.error("password field is required")
      }
     else if(this.userForm.value.password.length < 8)
      {
        this.toastr.error(' password must be of 8 characters');
      } 
       
    } else if (type === 'confirm') {
      if (this.userForm.value.confirm_password.replace(/\s/g, "") === '') {
        this.userForm.controls.confirm_password.patchValue(null);
      }
      else if(this.userForm.value.confirm_password === '' )
      {
        this.toastr.error("confirm password field is required")
      }
    }
  }

}
