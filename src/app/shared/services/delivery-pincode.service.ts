import { Injectable } from '@angular/core';

import { HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryPincodeService {

  // public apiUrl = environment.apiUrl;

  public apiUrl="https://api.halfpricebazar.com/v1/deliveries/check-delivery/";

  constructor(private http:HttpClient) {
   }

   getDeliveryPincode(pincode,businessId){
    console.log(pincode);
    console.log(businessId);
    return this.http.get(this.apiUrl+businessId+"/"+pincode+"/"+3000+"/"+1);
    }
}
