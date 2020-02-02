import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopicsReportsPageRoutingModule } from './topics-reports-routing.module';

import { TopicsReportsPage } from './topics-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicsReportsPageRoutingModule
  ],
  declarations: [TopicsReportsPage]
})
export class TopicsReportsPageModule {}
