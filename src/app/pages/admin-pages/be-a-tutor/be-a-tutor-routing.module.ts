import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeATutorPage } from './be-a-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: BeATutorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeATutorPageRoutingModule {}
