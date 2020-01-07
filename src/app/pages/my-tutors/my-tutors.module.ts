import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTutorsPageRoutingModule } from './my-tutors-routing.module';

import { MyTutorsPage } from './my-tutors.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MyTutorsPageRoutingModule
  ],
  declarations: [MyTutorsPage]
})
export class MyTutorsPageModule {}
