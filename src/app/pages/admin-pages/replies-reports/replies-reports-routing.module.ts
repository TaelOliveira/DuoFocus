import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepliesReportsPage } from './replies-reports.page';

const routes: Routes = [
  {
    path: '',
    component: RepliesReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepliesReportsPageRoutingModule {}
