// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_BASE_PATH: 'http://127.0.0.1:8038',
  sbb_dmz_broker: {
    url: 'wss://s-lt1-otc1-t01.sbb.ch:11443,wss://s-lt2-otc1-t01.sbb.ch:11443',
    vpnName: 'lta-int',
    userName: 'heiko',
    password: 'geheim',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
