import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AddUserPage } from './adduser.page';


const routes: Routes = [
  {
    path: '',
    component: AddUserPage,
  }
];

@NgModule({
  imports: [
    SharedModule,FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [AddUserPage]
})

export class AddUserPageModule {}
