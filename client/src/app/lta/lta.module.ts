import { ZugPosDetailComponent, ZugPosDetailDialogComponent } from './zug-pos/zug-pos.detail.component';
import { ZugPosListComponent } from './zug-pos/zug-pos.list.component';
import { MaterialModule } from './../material.module';
import { ZugPosDb } from './zug-pos/zug-pos-db.service';
import { ToolsModule } from './../tools/tools.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LtaRoutingModule } from './lta-routing.module';
import { ZugPosComponent } from './zug-pos/zug-pos.component';


@NgModule({
  declarations: [
    ZugPosComponent,
    ZugPosListComponent,
    ZugPosDetailComponent,
    ZugPosDetailDialogComponent
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
