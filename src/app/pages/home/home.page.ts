import { ApiService } from 'src/app/services/api.service-new';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MenuController } from "@ionic/angular";
import { Tools } from 'src/app/shared/tools';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;

  //For Admin
  AdminInqList = [];
  ALLAdminInqList = [];
  fullname = "";
  


  constructor(private menu: MenuController,public tools: Tools,
    private router: Router,private apiService: ApiService) 
    
    {
      this.user = this.apiService.getUserData();
      // events.subscribe('profileUpdate', (item) => {
      //   this.user = item;
      //   console.log('Event call')
      // });
    }

    ionViewDidEnter() {
      this.getAdminInquiryList();
    }
    
  openFirst() {
    this.menu.enable(true, "first"); 
    this.menu.open("first");
  }


productlist(){
  this.router.navigateByUrl("productslist");

}
cart(){
  this.router.navigateByUrl("cart");
}
Dashboard() {
  this.menu.close();
  this.router.navigateByUrl("home");
}
Cart() {
  this.menu.close();
  this.router.navigateByUrl("cart");
}
MyInquiry() {
  this.menu.close();
  this.router.navigateByUrl("myinquiry");
}
Profile() {
  this.menu.close();
  this.router.navigateByUrl("profile");
}
Contact() {
  this.menu.close();
  this.router.navigateByUrl("contactus");
}
logout(isLogin) {
  this.menu.close();
  if (isLogin)
    this.tools.presentLogout(
      "Are you sure you want to logout?",
      "Logout",
      "Cancel"
    );
  else {
    this.menu.close();
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}

//For Admin
Agent(){
  this.menu.close();
  this.router.navigateByUrl("agent");
}
Machine(){
  this.menu.close();
  this.router.navigateByUrl("machinelist");
}

addMachine(){
  this.menu.close();
  this.router.navigateByUrl("addmachine");
}
addMachinePart(){
  this.menu.close();
  this.router.navigateByUrl("addparts");
}
adminInquiry(inqID){
  console.log("ID >>",inqID)
  this.menu.close();
  this.router.navigateByUrl('inquirydetails/' + inqID);

}


getAdminInquiryList() {
  if (this.tools.isNetwork()) {
    this.tools.openLoader();
    this.apiService.AdminInqList().subscribe(data => {
      this.tools.closeLoader();
  
      let res: any = data;
      console.log(' Response ', res);
      this.AdminInqList = res.data.Inquiry;
      this.ALLAdminInqList = res.data.Inquiry;
  
    }, (error: Response) => {
      this.tools.closeLoader();
      console.log(error);
  
      let err: any = error;
      this.tools.openAlertToken(err.status, err.error.message);
    });

  }else {
    this.tools.closeLoader();
  }

}

// For Admin Filter
async ionChange(){
  console.log("click >>",this.fullname)
  this.AdminInqList = await this.ALLAdminInqList;
  const searchTerm =this.fullname;  
  if (!searchTerm) {
    return;
  }

  this.AdminInqList = this.AdminInqList.filter(currentDraw => {
    if (currentDraw.fullname && searchTerm) {
      return ((currentDraw.fullname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (currentDraw.Status.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)|| (currentDraw.InqNO.indexOf(searchTerm.toLowerCase()) > -1));
    }
  });
}

}
