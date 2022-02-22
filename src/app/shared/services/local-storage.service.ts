import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  subject = new Subject<any>();
  constructor() { }

  /**
   * Check if local storage object is available or not
   * @returns boolean
   */
  isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }
  
  /**
   * Get the local storage key's value
   * @param string key of local storage object
   * @returns boolean
   */
  get(key: string) {
    return localStorage && localStorage[key] ? localStorage[key] : '';
  }

  /**
   * Set the local storage key's value
   * @param string key of local storage object
   * @param string value of key
   * @returns observables
   */
  set(key: string, value: string) {
    localStorage[key] = value;
    return this;
  }

  /**
   * Remove the local storage key's value
   * @param string key of local storage object
   * @returns observables
   */
  remove(key: string) {
    delete localStorage[key];
    return this;
  }
}
