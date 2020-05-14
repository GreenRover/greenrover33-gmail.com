import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LtaRoutingModule } from './lta-routing.module';
import { ZugPosComponent } from './zug-pos/zug-pos.component';


@NgModule({
  declarations: [ZugPosComponent],
  imports: [
    CommonModule,
    LtaRoutingModule
  ]
})
export class LtaModule { }
