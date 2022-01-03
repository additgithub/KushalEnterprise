import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditMachinePage } from './editmachine.page';

const routes: Routes = [
  {
    path: '',
    component: EditMachinePage,
  }
];

@NgModule({
  imports: [
    SharedModule, 
       FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [EditMachinePage]
})
export class EditMachinePageModule {}
