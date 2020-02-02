import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeATutorPageRoutingModule } from './be-a-tutor-routing.module';

import { BeATutorPage } from './be-a-tutor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeATutorPageRoutingModule
  ],
  declarations: [BeATutorPage]
})
export class BeATutorPageModule {}
