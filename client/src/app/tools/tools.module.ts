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
  exports: [
    ToolPaginationComponent,
    ObjectValuesPipe
  ]
})
export class ToolsModule { }
