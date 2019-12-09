import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstSignInPageRoutingModule } from './first-sign-in-routing.module';

import { FirstSignInPage } from './first-sign-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstSignInPageRoutingModule
  ],
  declarations: [FirstSignInPage]
})
export class FirstSignInPageModule {}
