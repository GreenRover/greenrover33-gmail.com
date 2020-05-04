import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../material.module';
import { LtaRoutingModule } from './lta-routing.modules';
import { ZugPosDetailsComponent, ZugPosDetailsDialogComponent } from './zug-pos/zug-pos-detail.component';
import { ZugPosComponent } from './zug-pos/zug-pos.component';
import { ZugPosDb } from './zug-pos/zug-pos.db.service';

@NgModule({
  declarations: [
    ZugPosComponent,
    ZugPosDetailsComponent,
    ZugPosDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    LtaRoutingModule,

    MaterialModule
  ],
  providers: [
    ZugPosDb
  ]
})
export class LtaModule { }
