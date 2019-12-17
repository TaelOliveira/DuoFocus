import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorProfilePageRoutingModule } from './tutor-profile-routing.module';

import { TutorProfilePage } from './tutor-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorProfilePageRoutingModule
  ],
  declarations: [TutorProfilePage]
})
export class TutorProfilePageModule {}
