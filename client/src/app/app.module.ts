import { ToolsModule } from './tools/tools.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from './material.module';
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
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,

    CoasterModule,
    DesignModule,
    LocationModule,
    StatusModule,
    TypModule,

    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
