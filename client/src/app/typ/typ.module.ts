import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypRoutingModule } from './typ-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [ListComponent, EditComponent],
  imports: [
    CommonModule,
    TypRoutingModule
  ]
})
export class TypModule { }
