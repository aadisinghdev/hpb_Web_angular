import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private httpClient: HttpClient) { }

  postContactForm(data: any){
    return this.httpClient.post<any>("https://api.halfpricebazar.com/v1/contact-uses", data);
}

}