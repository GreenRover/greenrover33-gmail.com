import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiModule } from './../api/api.module';
import { Configuration } from './../api/configuration';
import { MaterialModule } from './../material.module';
import { ToolsModule } from './../tools/tools.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { LocationRoutingModule } from './location-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    LocationRoutingModule,

    ApiModule.forRoot(() => new Configuration({
      basePath: 'http://localhost:8039',
    })),

    ToolsModule,
    MaterialModule,
  ]
})
export class LocationModule { }
