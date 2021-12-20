import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { EditAgentPage } from './editagent.page';


const routes: Routes = [
  {
    path: '',
    component: EditAgentPage,
  }
];

@NgModule({
  imports: [
    SharedModule,FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [EditAgentPage]
})

export class EditAgentPageModule {}
