import { ApiService } from './../../services/api.service-new';
import { Tools } from './../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-productslist',
  templateUrl: 'productslist.page.html',
  styleUrls: ['productslist.page.scss'],
})
export class ProductsListPage {
  PartsList = [];
  MachineID = '';

  PartsName = "";
  itemsAll = [];

  sumCart = 0
  class_add = 'img carticon animate'
  cs_count = 'notification'

  cartCnt = [];

  constructor(public tools: Tools, private route: ActivatedRoute,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {
    this.sumCart = this.PartsList.reduce((a, b) => a + b.qty, 0);

    this.route.params
      .subscribe((params) => {
        console.log('params =>', params.MachineID);
        this.MachineID = params.MachineID;
      });

  }

  ionViewDidEnter() {
    this.getMachineParts();
  }
  cart() {
    this.router.navigateByUrl("cart");

  }
  getMachineParts() {
    if (this.tools.isNetwork()) {
      let postData = new FormData();

      postData.append('MachineID', this.MachineID);

      this.tools.openLoader();
      this.apiService.MachinePartsList(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response ', res);
        this.PartsList = [];
        this.itemsAll = [];
        for (let i = 0; i < res.data.Machinepart.length; i++) {
          const element = res.data.Machinepart[i];
          element.qty = 0;
          this.PartsList.push(element);
          this.itemsAll.push(element);
        }

      }, (error: Response) => {
        this.tools.closeLoader();
        console.log(error);

        let err: any = error;
        this.tools.openAlertToken(err.status, err.error.message);
      });

    } else {
      this.tools.closeLoader();
    }

  }

  // For Filter
  async ionChange() {
    this.PartsList = await this.itemsAll;
    const searchTerm = this.PartsName;
    if (!searchTerm) {
      return;
    }

    this.PartsList = this.PartsList.filter(currentDraw => {
      if (currentDraw.PartsName && searchTerm) {
        return ((currentDraw.PartsName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (currentDraw.PartsNo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
      }
    });
  }

  qty(item, i, type) {
    this.class_add = 'img'
    this.cs_count = 'notification'
    this.class_add = 'img carticon animate';
    this.cs_count = 'notification cartcount animate';
    if (type == 'min') {
      if (item.qty > 0) {
        this.PartsList[i].qty = (item.qty - 1)
      }
    } else {
      this.PartsList[i].qty = (item.qty + 1)
    }
    this.sumCart = this.PartsList.reduce((a, b) => a + b.qty, 0);

    this.cartCnt.push(this.PartsList[i]);
    this.apiService.setCartData(this.cartCnt);

    console.log("cartcant data >>",this.apiService.getCartData())
  }
}
