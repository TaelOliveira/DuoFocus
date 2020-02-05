import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackPageRoutingModule } from './feedback-routing.module';

import { FeedbackPage } from './feedback.page';
import { StarRatingModule } from 'ionic4-star-rating';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StarRatingModule,
    FormsModule,
    IonicModule,
    FeedbackPageRoutingModule
  ],
  declarations: [FeedbackPage]
})
export class FeedbackPageModule {}
