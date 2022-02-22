import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  public apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createWishList(payload) {
    return this.http.post(this.apiUrl + 'wishlists', payload).pipe(map(response => {
      return response;
    }))
  }

  createWishlistWithUserId(user_id) {
    const info = {userId: user_id }
    return this.http.post(this.apiUrl + 'wishlists', info).pipe(map(response => {
      return response;
    }))
  }

  updateWislist(id, payload) {
    return this.http.patch(this.apiUrl + 'wishlists/' + id, payload).pipe(map(response => {
      return response;
    }))
  }

  createWishListDetail(payload) {
    return this.http.post(this.apiUrl + 'wishlist-details', payload).pipe(map(response => {
      return response;
    }))
  }

  updateWishlistDetail(id , payload) {
    return this.http.patch(this.apiUrl + 'wishlist-details/' + id , payload).pipe(map(response => {
      return response;
    }))
  }

  isProductExistInWishlist(id,product_id) {
    const query = {
      where: { wishlistId : id, productId : product_id }
    }
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + "wishlist-details", options).pipe(map(response => {
      return response;
    }))
  }

  fetchWishListDetails(wishlist_id) {
    const query = {
      where: {
        and: [{ wishlistId: wishlist_id },]
      },
      include: [{ "all": true }]
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + "wishlist-details", options).pipe(map(response => {
      return response;
    }))
  }

  deleteWishlistDetail(id){
    return this.http.delete(this.apiUrl + "wishlist-details/"+id).pipe(map(response => {
      return response;
    }))
  }

  getWishlistByUserId(user_id){
    const query = {
      where: {
        and: [{ userId : user_id},{status :'open'}]
      }
    };
    console.log("query:"+query)
    const filter = JSON.stringify(query);
    console.log("filter:"+filter)
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    console.log("options:"+options)
    return this.http.get(this.apiUrl + "wishlists", options).pipe(map(response => {
      return response;
    }))
  }

}
