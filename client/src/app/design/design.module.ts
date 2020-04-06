import { MaterialModule } from './../material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignRoutingModule } from './design-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    DesignRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule
  ]
})
export class DesignModule { }
