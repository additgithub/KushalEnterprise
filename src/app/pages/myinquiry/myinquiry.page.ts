import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-myinquiry',
  templateUrl: 'myinquiry.page.html',
  styleUrls: ['myinquiry.page.scss'],
})
export class MyInquiryPage {

  InqList = [];
  colors = 'blackcolor'

  constructor(public tools: Tools,private activatedRoute: ActivatedRoute, 
     public formBuilder: FormBuilder,  private eventService:EventService,
     private apiService: ApiService, private router: Router) {


  }
  ionViewDidEnter() {
    this.getMyInquiry();
  }

  inquirydetails(inqID) {
    this.router.navigateByUrl('inquirydetails/' + inqID);

  }
  getMyInquiry() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.MyInqList().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' agent > ', res);
        this.InqList = res.data.MyInquiry;

        for (let i = 0; i < this.InqList.length; i++) {
        
          if(this.InqList[i].Status ==="Pending"){
            this.colors = 'yallowcolor'
          }
          if(this.InqList[i].Status === "In Progress"){
            this.colors = 'blackcolor'
          }
          if(this.InqList[i].Status ==="Completed"){
            this.colors = 'greencolor'
          }
          if(this.InqList[i].Status ==="Cancelled"){
            this.colors = 'radcolor'
          }
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
}
