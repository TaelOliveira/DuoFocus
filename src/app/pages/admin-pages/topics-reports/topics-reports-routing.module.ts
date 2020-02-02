import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopicsReportsPage } from './topics-reports.page';

const routes: Routes = [
  {
    path: '',
    component: TopicsReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicsReportsPageRoutingModule {}
