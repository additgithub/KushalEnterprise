import { EventService } from '../../services/EventService';
import { ApiService } from '../../services/api.service-new';
import { Component } from '@angular/core';
import { Tools } from '../../shared/tools';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PickerController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {

  loginForm: FormGroup;
  user: any;


  constructor(public pickerCtrl: PickerController,public tools:Tools,public formBuilder: FormBuilder,  private eventService:EventService,
    private activatedRoute: ActivatedRoute,private router: Router,public apiService:ApiService) {
      this.user = this.apiService.getUserData();

  //this.from = this.activatedRoute.snapshot.paramMap.get('from');
    this.loginForm = this.formBuilder.group({
      fname: [this.user.first_name, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lname: [this.user.last_name, [Validators.required,Validators.pattern('[a-zA-Z]+')]],
      agent: ['', [Validators.required]],
      mobile: [this.user.phone, [Validators.required, Validators.maxLength(10),Validators.pattern('[0-9]+')]],
      email: [this.user.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
 
    });
  }


  login(){
    localStorage.setItem('isFirst','true');
    this.router.navigateByUrl('login');
  }
  Saveprofile() {

    console.log("calll >>>")
    let fname = this.loginForm.get('fname').value;
    let lname = this.loginForm.get('lname').value;
    let mobile = this.loginForm.get('mobile').value;
    let email = this.loginForm.get('email').value;

    var msg = ''
    if (fname == "") {
      msg = msg + "Enter your first name<br />";
    }
    if (lname == "") {
      msg = msg + "Enter your last name<br />";
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
            let  postData = new FormData();
  
            postData.append('first_name', fname);
            postData.append('last_name', lname);
            postData.append('email', email);
            postData.append('phone', mobile);
            
            this.tools.openLoader();
            this.apiService.EditSaveAgent(postData).subscribe(response => {
              this.tools.closeLoader();
              let res: any = response;
               this.tools.backPage();
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
