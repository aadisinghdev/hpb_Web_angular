import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PincodeService {
  
    public apiUrl = environment.apiUrl;
  constructor(private http : HttpClient ) { }
  pincode(val) {

      return this.http.get(`${this.apiUrl}deliveries/pincode/${val}`)
    }
}

