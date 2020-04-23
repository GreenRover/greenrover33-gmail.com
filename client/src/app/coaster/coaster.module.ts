import { Configuration, ConfigurationParameters } from './../api/configuration';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiModule } from './../api/api.module';
import { MaterialModule } from './../material.module';
import { CoasterRoutingModule } from './coaster-routing.module';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent, DetailsComponent, EditComponent],
  imports: [
    CommonModule,
    CoasterRoutingModule,

    ApiModule.forRoot(() => new Configuration({
      basePath: 'http://localhost:8039',
    })),

    MaterialModule,
  ]
})
export class CoasterModule { }
