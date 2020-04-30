import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  { path: 'location', redirectTo: 'location/list/1', pathMatch: 'full' },
  { path: 'location/list', redirectTo: 'location/list/1', pathMatch: 'full' },
  { path: 'location/list/:page', component: ListComponent },
  { path: 'location/edit', component: EditComponent },
  { path: 'location/edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
