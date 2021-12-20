import { ApiService } from '../../services/api.service-new';
import { Component } from '@angular/core';
import { Tools } from '../../shared/tools';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-otpverification',
  templateUrl: 'otpverification.page.html',
  styleUrls: ['otpverification.page.scss'],
})
export class OTPVerificationPage {
  OTP = '';
  mno = '';
  loginForm: FormGroup;
  constructor(public tools: Tools,private route: ActivatedRoute,  public formBuilder: FormBuilder,  private eventService:EventService,private apiService: ApiService, private router: Router) {

    this.route.params
    .subscribe((params) => {
      console.log('params =>', params.mno);
      this.OTP = params.otp;
      this.mno = params.mno;
    });
    this.loginForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.maxLength(6),Validators.pattern('[0-9]+')]],
    });
  }

  resendOtp() {
      if (this.tools.isNetwork()) {
        this.tools.openLoader();
        this.apiService.sendOtp(this.mno).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          this.tools.openNotification(res.message)
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


  onSubmit() {
    let otp = this.loginForm.get('otp').value;

    var msg = ''

      if (otp == '') {
        msg = msg + 'Please Enter OTP<br />'
      }else if (otp != this.OTP) {
        msg = msg + 'Please enter a valid mobile No.<br />'
      }
 
    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      if (this.tools.isNetwork()) {
        this.tools.openLoader();
        this.apiService.confirmopt(otp,this.mno).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          this.loginForm.reset();
          localStorage.setItem('login_token', res.login_token);
          this.apiService.setUserData(res.data.user, res.login_token);
          this.router.navigateByUrl('/home', { replaceUrl: true }); 
        
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
