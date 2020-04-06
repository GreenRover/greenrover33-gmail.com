import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'design', redirectTo: 'design/list', pathMatch: 'full' },
  { path: 'design/list', component: ListComponent },
  { path: 'design/create', component: EditComponent },
  { path: 'design/update/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignRoutingModule { }
