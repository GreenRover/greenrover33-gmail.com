import { ApplicationStateService } from './applicationState.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolPaginationComponent } from './tool-pagination/tool-pagination.component';
import { ObjectValuesPipe } from './object-values.pipe';



@NgModule({
  declarations: [
    ToolPaginationComponent,
    ObjectValuesPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ApplicationStateService
  ],
  exports: [
    ToolPaginationComponent,
    ObjectValuesPipe
  ]
})
export class ToolsModule { }
