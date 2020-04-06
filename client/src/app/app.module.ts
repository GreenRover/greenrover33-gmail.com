import { BASE_PATH } from './../../generated/variables';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: BASE_PATH,
    useValue: environment.API_BASE_PATH
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
