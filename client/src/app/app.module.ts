import { TypModule } from './typ/typ.module';
import { StatusModule } from './status/status.module';
import { LocationModule } from './location/location.module';
import { DesignModule } from './design/design.module';
import { CoasterModule } from './coaster/coaster.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    CoasterModule,
    DesignModule,
    LocationModule,
    StatusModule,
    TypModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
