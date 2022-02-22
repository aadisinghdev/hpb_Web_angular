
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { faqData } from 'src/app/layout/faqs/faqData';
import { tap, catchError } from 'rxjs/operators';



@Injectable()
export class FaqService{

  private _url: string = "/assets/data/faqs.json";

  constructor(private http:HttpClient) { }

  getFaq(): Observable<faqData[]>{
    return this.http.get<faqData[]>(this._url)
                    .pipe(tap(data => JSON.stringify(data)) , catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }

}
