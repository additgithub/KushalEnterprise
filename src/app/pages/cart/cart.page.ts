import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
})
export class CartPage {

  cartData=[];
  
  sumCart = 0
  class_add = 'img carticon animate'
  cs_count = 'notification'

  cartCnt = [];
  constructor(public tools: Tools,private activatedRoute: ActivatedRoute, 
     public formBuilder: FormBuilder,  private eventService:EventService,
     private apiService: ApiService, private router: Router) {

      this.cartData=this.apiService.getCartData();
      console.log('cartdata > ',this.cartData.length)

  }

  register() {
    this.router.navigateByUrl('home');
  }
  qty(item, i, type) {
    this.class_add = 'img'
    this.cs_count = 'notification'
    this.class_add = 'img carticon animate';
    this.cs_count = 'notification cartcount animate';
    if (type == 'min') {
      if (item.qty > 0) {
        this.cartData[i].qty = (item.qty - 1)
      }
    } else {
      this.cartData[i].qty = (item.qty + 1)
    }
    this.sumCart = this.cartData.reduce((a, b) => a + b.qty, 0);

    this.cartCnt.push(this.cartData[i]);
    this.apiService.setCartData(this.cartCnt);

    console.log("cartcant data >>",this.apiService.getCartData())
  }

}
