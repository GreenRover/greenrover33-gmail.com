import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignRoutingModule } from './design-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [ListComponent, EditComponent],
  imports: [
    CommonModule,
    DesignRoutingModule
  ]
})
export class DesignModule { }
