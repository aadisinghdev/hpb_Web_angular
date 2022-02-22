import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { LocalStorageService } from './local-storage.service';
import { UserProfileService } from './user-profile.service';


@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  
  public cartDetails: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public productCount:BehaviorSubject<any> =new BehaviorSubject<any>(0);
  public profileImage:BehaviorSubject<any> =new BehaviorSubject<any>("https://res.cloudinary.com/adixoo-com/image/upload/v1634230303/fwyhme0rbiqvtnr3tmt7.jpg");

  constructor(private userService:UserProfileService,
    private cart:CartService,private cookie: CookieService,
    private localStorageService: LocalStorageService) { }
 
  
}
