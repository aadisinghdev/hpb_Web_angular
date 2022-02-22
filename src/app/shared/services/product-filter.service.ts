import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  getBrand(){
    return this.http.get(this.apiUrl+"brands").pipe(map(response => {
      return response;
    }));
  }
  

  getSize(){
    return this.http.get(this.apiUrl+"size").pipe(map(response => {
      return response;
    }));
  }

  
  getColors(){

    return this.http.get(this.apiUrl+'colors').pipe(map(response => {
      return response;
    }))

  }
  
}
