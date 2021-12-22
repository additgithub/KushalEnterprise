import { EventService } from '../../services/EventService';
import { ApiService } from '../../services/api.service-new';
import { Component } from '@angular/core';
import { Tools } from '../../shared/tools';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PickerController } from '@ionic/angular';


@Component({
  selector: 'app-adduser',
  templateUrl: 'adduser.page.html',
  styleUrls: ['adduser.page.scss'],
})
export class AddUserPage {

  loginForm: FormGroup;
  user: any;


  constructor(public pickerCtrl: PickerController, public tools: Tools, public formBuilder: FormBuilder, private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService) {
    this.loginForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      compname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],

    });
    this.user = this.apiService.getUserData();

  }
  

  AddUser() {

    let fname = this.loginForm.get('fname').value;
    let lname = this.loginForm.get('lname').value;
    let compname = this.loginForm.get('compname').value;
    let email = this.loginForm.get('email').value;
    let mobile = this.loginForm.get('mobile').value;

    var msg = ''
    if (fname == "") {
      msg = msg + "Enter your first name<br />";
    }
    if (lname == "") {
      msg = msg + "Enter your last name<br />";
    }
    if (compname == "") {
      msg = msg + "Enter your company name<br />";
    }
    if (this.loginForm.get("email").invalid) {
      if (email == "") {
        msg = msg + "Please enter email address<br />";
      } else {
        msg = msg + "Please enter a valid email address<br />";
      }
    }
    if (mobile == "" || mobile.length != 10) {
      msg = msg + "Please enter a valid mobile number<br />";
    }

    if (msg != '') {
      this.tools.openAlert(msg);
    } else {

      if (this.tools.isNetwork()) {
        this.tools.openLoader();
        this.apiService.AddUser(fname,lname,compname,email,mobile,this.user.id).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          this.loginForm.reset();
          this.tools.backPage();
          this.tools.openNotification(res.message);

        }, (error: Response) => {
          this.tools.closeLoader();
          let err: any = error;
          console.log('Api Error ', err);

        });
      } else {
        this.tools.closeLoader();
      }
    }


  }

}
