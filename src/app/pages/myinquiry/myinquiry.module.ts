import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyInquiryPage } from './myinquiry.page';

const routes: Routes = [
  {
    path: '',
    component: MyInquiryPage,
  }
];

@NgModule({
  imports: [
    SharedModule, 
       FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [MyInquiryPage]
})
export class MyInquiryPageModule {}
