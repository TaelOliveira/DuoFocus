import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackEmailsPage } from './feedback-emails.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackEmailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackEmailsPageRoutingModule {}
