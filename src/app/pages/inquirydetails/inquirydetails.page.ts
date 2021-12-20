import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-inquirydetails',
  templateUrl: 'inquirydetails.page.html',
  styleUrls: ['inquirydetails.page.scss'],
})
export class InquiryDetailsPage {
  inqID = '';

  InqNO = '';
  InqDate = '';
  Custname = '';
  Agentname = '';
  AlreadySelStatus = '';

  AdminInqDetails = [];

  StatusList: [];

  Selstatus = "";

  constructor(public tools: Tools, private route: ActivatedRoute,
    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {

    this.route.params
      .subscribe((params) => {
        console.log('params =>', params.inqID);
        this.inqID = params.inqID;
      });

  }
  ionViewDidEnter() {
    this.getAdminInquiryDetail();
  }
  onChangeState(agent) {
    this.Selstatus = agent;
    console.log('Select agent ' + agent);
  }

  getAdminInquiryDetail() {
    if (this.tools.isNetwork()) {
      let postData = new FormData();

      postData.append('InquiryHdrID', this.inqID);

      this.tools.openLoader();
      this.apiService.AdminInqDetail(postData).subscribe(data => {
        this.tools.closeLoader();
        this.getStatusList();

        let res: any = data;
        console.log(' Response ', res);
        this.AdminInqDetails = res.data.InquiryDetail;

        this.InqNO = this.AdminInqDetails[0].InqNO
        this.InqDate = this.AdminInqDetails[0].InqDate
        this.Custname = this.AdminInqDetails[0].fullname
        this.Agentname = this.AdminInqDetails[0].fullname
        this.AlreadySelStatus = this.AdminInqDetails[0].Status

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
  getStatusList() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.getStatus().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response ', res);
        this.StatusList = res.data.Status;
        

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
  accept() {
    console.log("status >>", this.Selstatus)
    var msg = ''
    if (this.Selstatus == undefined || this.Selstatus == "") {
      msg = msg + "Select Status<br />";
    }

    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
      if (this.tools.isNetwork()) {
        let postData = new FormData();

        postData.append('InquiryHdrID', this.inqID);
        postData.append('Status', this.Selstatus);

        this.tools.openLoader();
        this.apiService.ChangeStatus(postData).subscribe(response => {
          this.tools.closeLoader();
          let res: any = response;
          this.tools.backPage()

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
