import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AddPartsPage } from './addparts.page';


const routes: Routes = [
  {
    path: '',
    component: AddPartsPage,
  }
];

@NgModule({
  imports: [
    SharedModule,FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [AddPartsPage]
})

export class AddPartsPageModule {}
