import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'status', redirectTo: 'status/list', pathMatch: 'full' },
  { path: 'status/list', component: ListComponent },
  { path: 'status/edit', component: EditComponent },
  { path: 'status/edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusRoutingModule { }
