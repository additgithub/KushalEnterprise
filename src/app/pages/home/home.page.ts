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

  //For User
  MachineList = [];
  ALLMachineList = [];
  machineName = "";

  constructor(private menu: MenuController, public tools: Tools,
    private router: Router, private apiService: ApiService) {
    this.user = this.apiService.getUserData();
    // events.subscribe('profileUpdate', (item) => {
    //   this.user = item;
    //   console.log('Event call')
    // });
  }

  ionViewDidEnter() {
    if (this.user.roleid === '1') {
      this.getAdminInquiryList();
    }
    if (this.user.roleid === '2') {
      this.getMachineList();
    }
  }

  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }

  productlist(MachineID) {
    this.router.navigateByUrl("productslist/"+MachineID);

  }
  cart() {
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
  Agent() {
    this.menu.close();
    this.router.navigateByUrl("agent");
  }
  Machine() {
    this.menu.close();
    this.router.navigateByUrl("machinelist");
  }

  addMachine() {
    this.menu.close();
    this.router.navigateByUrl("addmachine");
  }
  addMachinePart() {
    this.menu.close();
    this.router.navigateByUrl("addparts");
  }
  adminInquiry(inqID) {
    console.log("ID >>", inqID)
    this.menu.close();
    this.router.navigateByUrl('inquirydetails/' + inqID);

  }

  getMachineList() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.MachineList().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' Response ', res);
        this.MachineList = res.data.Machine;
        this.ALLMachineList = res.data.Machine;

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

    } else {
      this.tools.closeLoader();
    }

  }

  // For Admin Filter
  async ionChangeUser() {
    console.log("click >>", this.machineName)
    this.MachineList = await this.ALLMachineList;
    const searchTerm = this.machineName;
    if (!searchTerm) {
      return;
    }

    this.MachineList = this.MachineList.filter(currentDraw => {
      if (currentDraw.MachineName && searchTerm) {
        return ((currentDraw.MachineName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
      }
    });
  }
  // For Admin Filter
  async ionChangeAdmin() {
    console.log("click >>", this.fullname)
    this.AdminInqList = await this.ALLAdminInqList;
    const searchTerm = this.fullname;
    if (!searchTerm) {
      return;
    }

    this.AdminInqList = this.AdminInqList.filter(currentDraw => {
      if (currentDraw.fullname && searchTerm) {
        return ((currentDraw.fullname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (currentDraw.Status.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (currentDraw.InqNO.indexOf(searchTerm.toLowerCase()) > -1));
      }
    });
  }

}
