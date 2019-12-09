import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstSignInPage } from './first-sign-in.page';

const routes: Routes = [
  {
    path: '',
    component: FirstSignInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstSignInPageRoutingModule {}
