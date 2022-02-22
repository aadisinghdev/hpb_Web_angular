import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PageLoaderService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);

  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  startLoading() {
    this._isLoading$.next(true);
  }
  stopLoading() {
    this._isLoading$.next(false);
  }
}
