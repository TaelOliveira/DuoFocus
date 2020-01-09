import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorReviewsPage } from './tutor-reviews.page';

const routes: Routes = [
  {
    path: '',
    component: TutorReviewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorReviewsPageRoutingModule {}
