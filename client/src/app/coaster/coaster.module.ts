import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoasterRoutingModule } from './coaster-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [ListComponent, DetailsComponent, EditComponent],
  imports: [
    CommonModule,
    CoasterRoutingModule
  ]
})
export class CoasterModule { }
