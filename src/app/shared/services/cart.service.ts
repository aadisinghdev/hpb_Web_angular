import { HttpClient, HttpParams, HttpXhrBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl: string = environment.apiUrl
  public cartItemCount: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(private http: HttpClient) { }

  createCart() {
    const info = { totalAmount: 0 }
    return this.http.post(this.apiUrl + 'carts', info).pipe(map(response => {
      return response;
    }))
  }

  createCartWithUserId(user_id) {
    const info = { totalAmount: 0, userId: user_id }
    return this.http.post(this.apiUrl + 'carts', info).pipe(map(response => {
      return response;
    }))
  }

  updateCart(id, payload) {
    return this.http.patch(this.apiUrl + 'carts/' + id, payload).pipe(map(response => {
      return response;
    }))
  }

  updateCartDetail(id , payload) {
    return this.http.patch(this.apiUrl + 'cart-details/' + id , payload).pipe(map(response => {
      return response;
    }))
  }

  createCartDetail(payload) {
    return this.http.post(this.apiUrl + 'cart-details', payload).pipe(map(response => {
      return response;
    }))
  }

  getCart(cart_id) {
    const query = {
      where: {
        and: [{ cartId: cart_id, status : 'open' },]
      },
      include: [{ "all": true }]
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + "cart-details", options).pipe(map(response => {
      return response;
    }))
  }

  getCartWithUserId(user_id) {
    const query = {
      where: {
        and: [{ userId: user_id , status : 'open'}]
      },
    };
    console.log("query:"+query)
    const filter = JSON.stringify(query);
    console.log("filter:"+filter)
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    console.log("options:"+options)
    return this.http.get(this.apiUrl + "carts", options).pipe(map(response => {
      return response;
    }))
  }

  isProductExistInCart(id,product_id) {
    const query = {
      where: { cartId : id, productId : product_id }
    }
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + "cart-details", options).pipe(map(response => {
      return response;
    }))
  }

  deleteCartDetail(id) {
    return this.http.delete(this.apiUrl + "cart-details/" + id).pipe(map(response => {
      return response;
    }))
  }

  mergeCart(payload) {
    return this.http.post(this.apiUrl + "carts/merge",payload).pipe(map(response => {
      return response;
    }))
  }
}
