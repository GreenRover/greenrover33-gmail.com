import { MaterialModule } from './material.module';
import { TypModule } from './typ/typ.module';
import { StatusModule } from './status/status.module';
import { LocationModule } from './location/location.module';
import { DesignModule } from './design/design.module';
import { CoasterModule } from './coaster/coaster.module';
import { ApiModule } from './api/api.module';
import { BASE_PATH, SBB_DMZ_BROKER } from './api/variables';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,

    ApiModule,
    CoasterModule,
    DesignModule,
    LocationModule,
    StatusModule,
    TypModule,

    MaterialModule
  ],
  providers: [{
    provide: BASE_PATH,
    useValue: environment.API_BASE_PATH
  }, {
    provide: SBB_DMZ_BROKER,
    useValue: environment.sbb_dmz_broker
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
