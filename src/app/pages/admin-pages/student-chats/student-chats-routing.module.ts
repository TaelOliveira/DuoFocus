import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentChatsPage } from './student-chats.page';

const routes: Routes = [
  {
    path: '',
    component: StudentChatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentChatsPageRoutingModule {}
