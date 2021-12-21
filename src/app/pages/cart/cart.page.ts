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

  cartData = [];

  sumCart = 0
  class_add = 'img carticon animate'
  cs_count = 'notification'

  cartCnt = [];
  constructor(public tools: Tools, private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {

    this.cartData = this.apiService.getCartData();
    console.log('cartdata > ', this.cartData)

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

    let index = this.cartCnt.findIndex(el => el.MachinePartsID === item.MachinePartsID)

    console.log('index ', index)
    if (index != -1) {
      console.log('this.cartCnt[index].qty ', this.cartCnt[index].qty)
      this.cartCnt[index].qty = item.qty;
      if (this.cartCnt[index].qty == 0) {
        this.cartCnt.splice(index, 1);
      }
    } else {
      this.cartCnt.push(item);
    }

    this.apiService.setCartData(this.cartCnt);

    console.log("cartcant data >>", this.apiService.getCartData())
  }

  submitInq() {

    var msg = ''

    if (this.cartData == undefined) {
      msg = msg + 'Cart is empty please add item in cart<br />'
    }

    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      if (this.tools.isNetwork()) {
        this.tools.openLoader();
        let postData = new FormData();

        postData.append('cartdata', JSON.stringify(this.cartData));
        this.apiService.AddCartDetails(postData).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          console.log('Api Error ', res);
          this.tools.openNotification(res.message);
          localStorage.removeItem('kushal_cart_data');
          this.router.navigateByUrl('home');


        }, (error: Response) => {
          let err: any = error;
          console.log('Api Error ', err);

          this.tools.closeLoader();
          this.tools.openAlertToken(err.status, err.error.message);
          console.log('Api Error >>>> ', err.error.message);

        });
      } else {
        this.tools.closeLoader();
      }
    }
  }


}
