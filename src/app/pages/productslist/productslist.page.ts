import { Platform } from '@ionic/angular';
import { ApiService } from './../../services/api.service-new';
import { Tools } from './../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import {HTTP} from "@ionic-native/http/ngx";
import { File } from '@ionic-native/file/ngx';

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

  MachinePdf='';

  constructor(public tools: Tools, private route: ActivatedRoute,private _nativeHttp: HTTP, private file: File,
    public formBuilder: FormBuilder, private eventService: EventService,public  platform: Platform,
    private apiService: ApiService, private router: Router) {

    this.route.params
      .subscribe((params) => {
        console.log('params =>', params.MachinePdf);
        this.MachineID = params.MachineID;
      });
      this.MachinePdf = localStorage.getItem("MachinePdf");

        console.log('MachinePdf =>', this.MachinePdf);


  }

  ionViewDidEnter() {
    if (this.apiService.getCartData() != undefined) {
      this.sumCart = this.apiService.getCartData().reduce((a, b) => a + b.qty, 0);
    }
    this.getMachineParts();
  }
 

  pdf(){

    //for all platform
    // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
    //   console.log('Directory doesn't exist'));

    // this.platform.ready().then(() =>{
		// 	if(this.platform.is('android')) {
		// 		this.file.checkDir(this.file.externalRootDirectory, 'KushalEnterPrise').then(response => {
		// 			console.log('Directory exists'+response);
		// 		}).catch(err => {
		// 			console.log('Directory doesn\'t exist'+JSON.stringify(err));
		// 			this.file.createDir(this.file.externalRootDirectory, 'KushalEnterPrise', false).then(response => {
		// 				console.log('Directory create'+response);
		// 			}).catch(err => {
		// 				console.log('Directory no create'+JSON.stringify(err));
		// 			}); 
		// 		});
		// 	}
		// });

    this.tools.openLoader();
    //let targetPath = cordova.file.externalRootDirectory+ "download/"+moment().format("YYYYMMDDHHmmsss")+".pdf";

        const filePath = this.file.dataDirectory + 'KushalEnterPrise.pdf'; 
                         // for iOS use this.file.documentsDirectory
        
        this._nativeHttp.downloadFile(this.MachinePdf, {}, {}, filePath).then(response => {
           // prints 200
           this.tools.closeLoader();
           this.tools.openNotification("success block...")
           console.log('success block...', response);
        }).catch(err => {
          this.tools.closeLoader();
            // prints 403
            this.tools.openNotification("error block...")

            console.log('error block ... ', err.status);
            // prints Permission denied
            console.log('error block ... ', err.error);
        })
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

          if (this.apiService.getCartData() != undefined) {

            let index = this.apiService.getCartData().findIndex(el => el.MachinePartsID === element.MachinePartsID)
            console.log("cart qty >>", index)

            if (index == - 1) {
              element.qty = 0;
            } else {
              console.log("index qty >>",this.apiService.getCartData()[index].qty)
              element.qty = this.apiService.getCartData()[index].qty;
            }
          } else {
            element.qty = 0;

          }


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
}
