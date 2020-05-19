import { MaterialModule } from './../material.module';
import { ZugPosDb } from './zug-pos/zug-pos-db.service';
import { ToolsModule } from './../tools/tools.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LtaRoutingModule } from './lta-routing.module';
import { ZugPosComponent } from './zug-pos/zug-pos.component';


@NgModule({
  declarations: [
    ZugPosComponent
  ],
  imports: [
    CommonModule,
    LtaRoutingModule,
    ToolsModule,

    MaterialModule
  ],
  providers: [
    ZugPosDb
  ]
})
export class LtaModule { }
