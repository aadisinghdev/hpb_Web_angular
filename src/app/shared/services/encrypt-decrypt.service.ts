import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  private Key:any=environment.KEY
  private IV:any=environment.IV

  constructor() { }

  encryptUsingAES256(data) {

  const _key = CryptoJS.enc.Utf8.parse(this.Key);
   const _iv = CryptoJS.enc.Utf8.parse(this.IV);
    // let _key = this._key;
    // let _iv = this._iv;
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }

  decryptUsingAES256(data) {

  const _key = CryptoJS.enc.Utf8.parse(this.Key);
  const _iv = CryptoJS.enc.Utf8.parse(this.IV);

    let decrypted = CryptoJS.AES.decrypt(
      data, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return decrypted.toString(CryptoJS.enc.Utf8)
  }

}
