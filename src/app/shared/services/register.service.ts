import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl: string = environment.apiUrl
  constructor(private http: HttpClient) { }

  createUser(payload){
    return this.http.post(this.apiUrl + "users", payload).pipe(map(response =>{
          return response;
    }))
  }

  generatingOtp(payload){
    return this.http.post(this.apiUrl + "otps/generate" , payload).pipe(map(response => {
          return response;
    }))
  }

  verifyingOtp(payload){
    return this.http.post(this.apiUrl+"otps/validate",payload).pipe(map(response => {
      return response;
    }))
  }

}
