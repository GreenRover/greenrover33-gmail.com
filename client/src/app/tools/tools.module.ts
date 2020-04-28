import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolPaginationComponent } from './tool-pagination/tool-pagination.component';



@NgModule({
  declarations: [
    ToolPaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToolPaginationComponent
  ]
})
export class ToolsModule { }
