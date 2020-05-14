import { SolaceSession } from './api/Solace.session';
import { LtaService } from './api/lta.service';
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { CoasterService } from './api/coaster.service';
import { DesignService } from './api/design.service';
import { LocationService } from './api/location.service';
import { StatusService } from './api/status.service';
import { TypService } from './api/typ.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    CoasterService,
    DesignService,
    LocationService,
    StatusService,
    TypService,

    SolaceSession,
    LtaService
  ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
