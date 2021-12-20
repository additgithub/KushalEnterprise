import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { EditPartsPage } from './editpart.page';


const routes: Routes = [
  {
    path: '',
    component: EditPartsPage,
  }
];

@NgModule({
  imports: [
    SharedModule,FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [EditPartsPage]
})

export class EditPartPageModule {}
