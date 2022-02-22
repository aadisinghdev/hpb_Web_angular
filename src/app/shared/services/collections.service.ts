import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http : HttpClient) { }

  getAllCollections(){
    const query = {
      where : {
        status : 'active'
      }
    }
    const filter = JSON.stringify(query)
    const options = {
      params: new HttpParams()
      .append("filter", filter)
    }
    return this.http.get(this.apiUrl + 'collections',options).pipe(map(response =>{
          return response;
    }))
  }
}
