import { ApplicationStateService } from './applicationState.service';
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
  providers: [
    ApplicationStateService
  ],
  exports: [
    ToolPaginationComponent
  ]
})
export class ToolsModule { }
