import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = environment.apiUrl
  constructor(private http: HttpClient) { }

  loginUser(payload){
      return this.http.post(this.apiUrl + "auth/login/email" , payload).pipe(map(response => {
            return response;
      }))
  }
}
