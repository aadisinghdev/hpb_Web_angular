import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  public apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  get userData() {
    return JSON.parse(this.localStorageService.get('user-detail'));
  }

  getUserDetails() {
    
    return this.http.get(this.apiUrl + 'users/' ).pipe(map(response => {
      return response;
    }))
  }
  getUserDetailsByContact(number:any) 
  {
    let contact=number.mobile;
    const query = {
      where: { mobile : contact,status:"active" }
    }
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    }; 
    return this.http.get(this.apiUrl + 'users/',options ).pipe(map(response => {
      console.log(response);
      return response;
    }))
  }
  getUserDetailsById(id) {
    
    return this.http.get(this.apiUrl + 'users/' + id).pipe(map(response => {
      return response;
    }))
  }

  updateUserRecord(payload, id) {
    return this.http.patch(this.apiUrl + "users/" + id, payload).pipe(map(response => {
      return response;
    }))
  }

  uploadProfilePhoto(formData) {
    const options = {
      params: new HttpParams()
        .append("channel", 'cloudinary')
    };
    return this.http.post(this.apiUrl + 'files/upload', formData,options).pipe(map(response => {
      return response;
    }))
  }
}
