import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartPage } from './cart.page';

const routes: Routes = [
  {
    path: '',
    component: CartPage,
  }
];

@NgModule({
  imports: [
    SharedModule, 
       FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [CartPage]
})
export class CartPageModule {}
