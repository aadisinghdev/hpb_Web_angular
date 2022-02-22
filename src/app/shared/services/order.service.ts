import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl: string = environment.apiUrl
  constructor(private http: HttpClient) { }

  createOrder(payload) {
    return this.http.post(this.apiUrl + 'orders', payload).pipe(map(response => {
      return response;
    }))
  }

  orderCheckout(txnToken,orderNum){
    // Setup log namespace query parameter
    let obj = {'txnToken' : txnToken , 'orderNumber' : orderNum};
    return this.http.get(this.apiUrl + 'payments/checkout',{params : obj}).pipe(map(response =>{
        return response;
    }))
  }

  getOrders(id){
    const query = {
      where: {
        // and: [{ userId : id},{status :'placed'}]
        and: [{ userId : id}]
      }
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'orders/details', options).pipe(map(response =>{
        return response;
    }))
  }

  getCancelOrder(id){
    const query = {
      where: {
        and: [{ userId : id},{status :'cancelled'}]  
      }
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'orders/details', options).pipe(map(response =>{
        return response;
    })) 
  }

  getDeliveredOrder(id){
    const query = {
      where: {
        and: [{ userId : id},{status :'delivered'}]  
      }
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'orders/details', options).pipe(map(response =>{
        return response;
    })) 
  }

  getExchangedOrder(id){
    const query = {
      where: {
        and: [{ userId : id},{status :'exchanged'}]  
      }
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'orders/details', options).pipe(map(response =>{
        return response;
    }))
  }

  getReturnedOrder(id){
    const query = {
      where: {
        and: [{ userId : id},{status :'returned'}]  
      }
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'orders/details', options).pipe(map(response =>{
        return response;
    }))
  }

  cancelOrder(id,value){
    return this.http.patch(this.apiUrl + 'deliveries/order-cancel/'+id,value).pipe(map(response =>{
      
        return response;
    }))
  }
}
