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

  
  constructor(public tools: Tools,private activatedRoute: ActivatedRoute, 
     public formBuilder: FormBuilder,  private eventService:EventService,
     private apiService: ApiService, private router: Router) {


  }

  register() {
    this.router.navigateByUrl('home');
  }
  inquirydetails() {
    this.router.navigateByUrl('inquirydetails');
  }

}
