import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiModule } from './../api/api.module';
import { Configuration } from './../api/configuration';
import { MaterialModule } from './../material.module';
import { ToolsModule } from './../tools/tools.module';
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

    ToolsModule,
    MaterialModule,
  ]
})
export class CoasterModule { }
