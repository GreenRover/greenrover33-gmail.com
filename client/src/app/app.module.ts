import { ChatRoutingModule } from './chat/chat-routing.module';
import { ChatModule } from './chat/chat.module';
import { LtaModule } from './lta/lta.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { BASE_PATH, SBB_DMZ_BROKER } from './api/variables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoasterModule } from './coaster/coaster.module';
import { DesignModule } from './design/design.module';
import { LocationModule } from './location/location.module';
import { MaterialModule } from './material.module';
import { StatusModule } from './status/status.module';
import { TypModule } from './typ/typ.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChatModule,
    ChatRoutingModule,

    HttpClientModule,

    CoasterModule,
    DesignModule,
    LocationModule,
    StatusModule,
    TypModule,
    LtaModule,

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
