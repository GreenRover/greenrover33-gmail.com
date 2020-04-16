import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [ListComponent, EditComponent],
  imports: [
    CommonModule,
    StatusRoutingModule
  ]
})
export class StatusModule { }
