import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path: 'coaster',      redirectTo: 'coaster/list/1', pathMatch: 'full' },
  { path: 'coaster/list', redirectTo: 'coaster/list/1', pathMatch: 'full' },
  { path: 'coaster/list/:page', component: ListComponent },
  { path: 'coaster/details/:id', component: DetailsComponent },
  { path: 'coaster/edit', component: EditComponent },
  { path: 'coaster/edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoasterRoutingModule { }
