import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { EncryptDecryptService } from './services/encrypt-decrypt.service';
import { filter, tap } from 'rxjs/operators';

@Injectable()
export class AllInterceptInterceptor implements HttpInterceptor {


  constructor(private ende: EncryptDecryptService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler):Observable<HttpEvent<any>> {
    // let encrypt=this.ende.encryptUsingAES256(request.body)
    // let decrypt=this.ende.decryptUsingAES256(encrypt)
    // console.log(encrypt);
    // console.log(decrypt)

    // if(request.body===null){
    //   return next.handle(request);
    // }
    
    // else{
    //   let encrypt=this.ende.encryptUsingAES256(request.body)
    //   const modifyReq=request.clone({
    //     body:encrypt
    //   })

    //   return next.handle(modifyReq).pipe(
    //   filter(event => event instanceof HttpResponse),
    //   tap((event: HttpResponse<any>) => {
    //     console.log(event);
    //   });
    // }
    
    // return next.handle(request).pipe(
    //   filter(event => event instanceof HttpResponse),
    //   tap((event: HttpResponse<any>) => {
    //     console.log(event);
    //   })
    // );
    return next.handle(request);
  }

}
