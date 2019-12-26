import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTopicsPage } from './all-topics.page';

const routes: Routes = [
  {
    path: '',
    component: AllTopicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllTopicsPageRoutingModule {}
