import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'location', redirectTo: 'location/list', pathMatch: 'full' },
  { path: 'location/list', component: ListComponent },
  { path: 'location/edit', component: EditComponent },
  { path: 'location/edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
