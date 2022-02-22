import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentDate : Date;
  public currentDateUnix : number;
  constructor(private localStorageService : LocalStorageService) { }
  	/**
	 * Check token of user  
	 * @returns boolean - return true if token is valid  
	 */
	public isAuthenticated(): boolean {
		if (!this.localStorageService.get('token')) {
			return false;
		}
		try {

			const helper = new JwtHelperService();
			const token = this.localStorageService.get('token');
			const tokenPayload = helper.decodeToken(token);
			this.currentDate = new Date();
			this.currentDateUnix = this.currentDate.getTime();

			this.currentDateUnix = Math.floor(this.currentDateUnix / 100);
			if (this.currentDateUnix > tokenPayload.exp) {
				return true;
			}

			return false;

		} catch (error) {
			return false;
		}

	}

}
