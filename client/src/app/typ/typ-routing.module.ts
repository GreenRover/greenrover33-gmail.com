import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'typ', redirectTo: 'typ/list', pathMatch: 'full' },
  { path: 'typ/list', component: ListComponent },
  { path: 'typ/edit', component: EditComponent },
  { path: 'typ/edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypRoutingModule { }
