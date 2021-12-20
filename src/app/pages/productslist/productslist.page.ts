import { ApiService } from './../../services/api.service-new';
import { Tools } from './../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';

@Component({
  selector: 'app-productslist',
  templateUrl: 'productslist.page.html',
  styleUrls: ['productslist.page.scss'],
})
export class ProductsListPage {

  constructor(public tools: Tools,private activatedRoute: ActivatedRoute, 
     public formBuilder: FormBuilder,  private eventService:EventService,
     private apiService: ApiService, private router: Router) {

  }

  register() {
    this.router.navigateByUrl('home');
  }
  cart(){
    this.router.navigateByUrl("cart");
  
  }
}
