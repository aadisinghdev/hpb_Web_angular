import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string = environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllCategories() {
    const query = {
      where: {
        and: [{ status: 'active' },]
      },
      include: [{ "all": true }]
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'categories', options).pipe(map(response => {
      return response;
    }))
  }

  getAllSubCategories() {
    // const options:HttpParams ={} 
    const query = {
      where: {
        and: [{ status: 'active' },]
      },
      include: [{ "all": true }]
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'sub-categories', options);
  }

  getCategoryByCollectionId(id) {
    const query = {
      where: {
        and: [{ status: 'active', collectionId: id },]
      },
      include: [{ "all": true }]
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'categories', options).pipe(map(response => {
      return response;
    }))
  }
}
