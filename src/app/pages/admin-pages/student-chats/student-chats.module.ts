import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentChatsPageRoutingModule } from './student-chats-routing.module';

import { StudentChatsPage } from './student-chats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentChatsPageRoutingModule
  ],
  declarations: [StudentChatsPage]
})
export class StudentChatsPageModule {}
