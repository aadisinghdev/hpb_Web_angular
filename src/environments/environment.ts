// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as CryptoJS from 'crypto-js';

export const environment = {
  production: false,
  // apiUrl : "http://localhost:3000/v1/"
  headerCollectionLength : 5,
  apiUrl : "https://api.halfpricebazar.com/v1/",
  KEY: "0123456789123456",
  IV:"0123456789123456",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
