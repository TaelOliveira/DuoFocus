import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorProfilePage } from './tutor-profile.page';

const routes: Routes = [
  {
    path: '',
    component: TutorProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorProfilePageRoutingModule {}
