import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'design', redirectTo: 'design/list', pathMatch: 'full' },
  { path: 'design/list', component: ListComponent },
  { path: 'design/edit', component: EditComponent },
  { path: 'design/edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignRoutingModule { }
