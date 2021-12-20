import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { OTPVerificationPage } from './otpverification.page';

const routes: Routes = [
  {
    path: '',
    component: OTPVerificationPage,
  }
];

@NgModule({
  imports: [
    SharedModule,    FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [OTPVerificationPage]
})
export class OTPVerificationPageModule {}
