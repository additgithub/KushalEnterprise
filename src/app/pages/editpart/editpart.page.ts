import { EventService } from '../../services/EventService';
import { ApiService } from '../../services/api.service-new';
import { Component } from '@angular/core';
import { Tools } from '../../shared/tools';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PickerController } from '@ionic/angular';


@Component({
  selector: 'app-editpart',
  templateUrl: 'editpart.page.html',
  styleUrls: ['editpart.page.scss'],
})
export class EditPartsPage {
  MachinePartsID = '';
  PartsName ='';
  PartsNo = '';
  QOH = '';
  MachineName = '';
  loginForm: FormGroup;

  constructor(public pickerCtrl: PickerController, public tools: Tools,
     public formBuilder: FormBuilder, private eventService: EventService,
      private route: ActivatedRoute, private router: Router, public apiService: ApiService) {
    
    this.route.params
    .subscribe((params) => {
      console.log('params =>', params.MachinePartsID);
      this.MachinePartsID = params.MachinePartsID;
      this.PartsName = params.PartsName;
      this.PartsNo = params.PartsNo;
      this.QOH = params.QOH;
      this.MachineName = params.MachineName;

      this.loginForm = this.formBuilder.group({
        pname: [this.PartsName, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
        QOH: [this.QOH, [Validators.required, Validators.pattern('[0-9]+')]],
  
      });
    });
    
  
  }

  savePart() {
    let pname = this.loginForm.get('pname').value;
    let QOH = this.loginForm.get('QOH').value;

    console.log("QOH >>",QOH)
    var msg = ''

    if (pname == "") {
      msg = msg + "Enter Part name<br />";
    }
    if (QOH == null) {
      msg = msg + "Enter Part QTY<br />";
    }

    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      if (this.tools.isNetwork()) {
        let postData = new FormData();

        postData.append('MachinePartsID', this.MachinePartsID);
        postData.append('PartsName', pname);
        postData.append('QOH', QOH);

        this.tools.openLoader();
        this.apiService.EditPart(postData).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          this.tools.backPage()

        }, (error: Response) => {
          this.tools.closeLoader();
          let err: any = error;
          // console.log('Api Error ',err.error);
          // let msg = err.error.text.replace('(','').replace(')','');
          // this.tools.presentAlert('',JSON.parse(msg).msg);
          console.log('Api Error ', err);

        });
      } else {
        this.tools.closeLoader();
      }
    }



  }
  isReadonly() {return true;}


}
