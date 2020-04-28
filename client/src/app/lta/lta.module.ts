import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../material.module';
import { LtaRoutingModule } from './lta-routing.modules';
import { ZugPosComponent } from './zug-pos/zug-pos.component';

@NgModule({
  declarations: [ZugPosComponent],
  imports: [
    CommonModule,
    LtaRoutingModule,

    MaterialModule
  ]
})
export class LtaModule { }
