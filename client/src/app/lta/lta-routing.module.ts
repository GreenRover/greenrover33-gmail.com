import { ZugPosComponent } from './zug-pos/zug-pos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'lta', redirectTo: 'lta/tinkiwinki-dipsi-lala-po', pathMatch: 'full' },
  { path: 'lta/tinkiwinki-dipsi-lala-po', component: ZugPosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LtaRoutingModule { }
