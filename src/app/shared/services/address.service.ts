import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  public apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createNewAddress(payload) {
    return this.http.post(this.apiUrl + 'addresses', payload).pipe(map(response => {
      return response;
    }))
  }

  getAddressByUserId(id) {
    const query = {
      where: {
        and: [{ userId: id },]
      },
      include: [{ "all": true }],
      order:[['id','asc']]
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'addresses', options).pipe(map(response => {
      return response;
    }))
  }

  updateUserAddress(payload, id) {
    return this.http.patch(this.apiUrl + "addresses/" + id, payload).pipe(map(response => {
      return response;
    }))
  }
}
