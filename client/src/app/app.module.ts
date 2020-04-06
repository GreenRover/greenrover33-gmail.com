import { TypModule } from './typ/typ.module';
import { StatusModule } from './status/status.module';
import { LocationModule } from './location/location.module';
import { DesignModule } from './design/design.module';
import { CoasterModule } from './coaster/coaster.module';
import { ApiModule } from './api/api.module';
import { BASE_PATH } from './api/variables';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

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

    MatMenuModule,
    MatIconModule
  ],
  providers: [{
    provide: BASE_PATH,
    useValue: environment.API_BASE_PATH
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
