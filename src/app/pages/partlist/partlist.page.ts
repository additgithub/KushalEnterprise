import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-partlist',
  templateUrl: 'partlist.page.html',
  styleUrls: ['partlist.page.scss'],
})
export class PartListPage {
  MachineID = '';
  MachinePartsID = '';
  PartsList = [];

  PartsName = "";
  itemsAll = [];

  constructor(public tools: Tools, private route: ActivatedRoute,
    public alertController: AlertController,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {
    this.route.params
      .subscribe((params) => {
        console.log('params =>', params.MachineID);
        this.MachineID = params.MachineID;
      });
  }



  ionViewDidEnter() {
    this.getMachineParts();
  }

  addpart() {
    this.router.navigateByUrl("addparts");
  }

  DeletePart(MachinePartsID) {
    this.MachinePartsID = MachinePartsID;
    this.deleteAlert(
      "Are you sure you want to Delete?",
      "Delete",
      "Cancel"
    );
  }
  EditPart(part) {
    this.router.navigateByUrl('editpart/' + part.MachinePartsID + '/' + part.MachineName + '/' + part.PartsName + '/' + part.PartsNo + '/' + part.QOH);

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
        this.PartsList = res.data.Machinepart;
        this.itemsAll = res.data.Machinepart;

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

  deletePart() {
    if (this.tools.isNetwork()) {
      let postData = new FormData();

      postData.append('MachinePartsID', this.MachinePartsID);

      this.tools.openLoader();
      this.apiService.deletepart(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        this.getMachineParts();

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

  async deleteAlert(message, btnYes, btnNo) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: btnNo ? btnNo : 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: btnYes ? btnYes : 'Yes',
          handler: () => {
            this.deletePart();
          }
        }
      ], backdropDismiss: true
    });
    return await alert.present();
  }

  // For Filter
  async ionChange(){
    this.PartsList = await this.itemsAll;
    const searchTerm =this.PartsName;  
    if (!searchTerm) {
      return;
    }
  
    this.PartsList = this.PartsList.filter(currentDraw => {
      if (currentDraw.PartsName && searchTerm) {
        return ((currentDraw.PartsName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (currentDraw.PartsNo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
      }
    });
  }

}
