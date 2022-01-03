import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-machinelist',
  templateUrl: 'machinelist.page.html',
  styleUrls: ['machinelist.page.scss'],
})
export class MachineListPage {
  MachineList = [];
  MachineID = '';
  constructor(public tools: Tools, private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder, private eventService: EventService,
    public alertController: AlertController,

    private apiService: ApiService, private router: Router) {

  }
  ionViewDidEnter() {
    this.getMachineList();
  }


  addmachine() {
    this.router.navigateByUrl("addmachine");

  }
  Part(MachineID) {
    this.router.navigateByUrl('partlist/' + MachineID);
  }


  getMachineList() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.MachineList().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response ', res);
        this.MachineList = res.data.Machine;

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
  medit(MachineID,MachineName) {
    this.router.navigateByUrl('editmachine/' + MachineID +'/'+MachineName);
  }
  mdelete(MachineID) {
    this.MachineID = MachineID;
    this.deleteAlert(
      "Are you sure you want to Delete?",
      "Delete",
      "Cancel"
    );
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
            this.deleteMachine();
          }
        }
      ], backdropDismiss: true
    });
    return await alert.present();
  }
  deleteMachine() {
    if (this.tools.isNetwork()) {
      let postData = new FormData();

      postData.append('MachineID', this.MachineID);

      this.tools.openLoader();
      this.apiService.deleteMachine(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        this.getMachineList();

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
}
