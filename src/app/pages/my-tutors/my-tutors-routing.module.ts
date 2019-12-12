import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTutorsPage } from './my-tutors.page';

const routes: Routes = [
  {
    path: '',
    component: MyTutorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTutorsPageRoutingModule {}
