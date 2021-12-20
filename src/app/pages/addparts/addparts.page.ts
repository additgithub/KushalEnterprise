import { EventService } from '../../services/EventService';
import { ApiService } from '../../services/api.service-new';
import { Component } from '@angular/core';
import { Tools } from '../../shared/tools';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PickerController } from '@ionic/angular';


@Component({
  selector: 'app-addparts',
  templateUrl: 'addparts.page.html',
  styleUrls: ['addparts.page.scss'],
})
export class AddPartsPage {
  loginForm: FormGroup;
  from: any;
  MachineList: [];

  constructor(public pickerCtrl: PickerController, public tools: Tools, public formBuilder: FormBuilder, private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService) {
    this.from = this.activatedRoute.snapshot.paramMap.get('from');
    this.loginForm = this.formBuilder.group({
      machine: ['', [Validators.required]],
      pname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      pno: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      QOH: ['', [Validators.required,Validators.pattern('[0-9]+')]],

    });
  }

  ionViewDidEnter() {
    this.getMachineList();
  }

  onChangeState(machine) {
    console.log('Select agent ' + machine);
  }

  addPart() {
    let machine = this.loginForm.get('machine').value;
    let pname = this.loginForm.get('pname').value;
    let pno = this.loginForm.get('pno').value;
    let QOH = this.loginForm.get('QOH').value;

    var msg = ''
    if (machine == undefined || machine == "") {
      msg = msg + "Select machine<br />";
    }
    if (pname == "") {
      msg = msg + "Enter Part name<br />";
    }
    if (pno == "") {
      msg = msg + "Enter Part No<br />";
    }
    if (QOH == "") {
      msg = msg + "Enter Part QTY<br />";
    }

    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      if (this.tools.isNetwork()) {
        let postData = new FormData();

        postData.append('MachineID', machine);
        postData.append('PartsName', pname);
        postData.append('PartsNo', pno);
        postData.append('QOH', QOH);

        this.tools.openLoader();
        this.apiService.AddPart(postData).subscribe(response => {
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


  onlyAlpha(event: any) {
    const pattern = /[a-zA-Z]+/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
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
}
