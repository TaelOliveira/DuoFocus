import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorReviewsPageRoutingModule } from './tutor-reviews-routing.module';

import { TutorReviewsPage } from './tutor-reviews.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorReviewsPageRoutingModule
  ],
  declarations: [TutorReviewsPage]
})
export class TutorReviewsPageModule {}
