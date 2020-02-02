import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepliesReportsPageRoutingModule } from './replies-reports-routing.module';

import { RepliesReportsPage } from './replies-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepliesReportsPageRoutingModule
  ],
  declarations: [RepliesReportsPage]
})
export class RepliesReportsPageModule {}
