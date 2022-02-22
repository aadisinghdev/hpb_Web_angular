import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ForgotPasswordService {

  private apiUrl: string = environment.apiUrl
  constructor(private http: HttpClient) { }

  generatingOtp(payload){
    return this.http.post(this.apiUrl + "auth/generate-otp" , payload).pipe(map(response => {
          return response;
    }))
  }

  verifyingOtp(payload){
    return this.http.post(this.apiUrl+"auth/login/mobile",payload).pipe(map(response => {
      return response;
    }))
  }
}
