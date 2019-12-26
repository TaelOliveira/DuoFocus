import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllTopicsPageRoutingModule } from './all-topics-routing.module';

import { AllTopicsPage } from './all-topics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllTopicsPageRoutingModule
  ],
  declarations: [AllTopicsPage]
})
export class AllTopicsPageModule {}
