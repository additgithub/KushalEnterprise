import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agent',
  templateUrl: 'agent.page.html',
  styleUrls: ['agent.page.scss'],
})
export class AgentPage {
  AgentList = [];
  Agentid = '';

  AgentName = "";
  itemsAll = [];

  constructor(public tools: Tools, private route: ActivatedRoute,
    public alertController: AlertController,

    public formBuilder: FormBuilder, private eventService: EventService,
    private apiService: ApiService, private router: Router) {

  }
  ionViewDidEnter() {
    this.getAgentList();
  }
  addAgent() {
    this.router.navigateByUrl("addagent");
  }
  agentEdit(agent) {
    this.router.navigateByUrl('editagent/' + agent.id + '/' + agent.first_name + '/' + agent.last_name + '/' + agent.email + '/' + agent.phone);
  }

  agentDelete(Agentid) {
    this.Agentid = Agentid;
    this.deleteAlert(
      "Are you sure you want to Delete?",
      "Delete",
      "Cancel"
    );
  }
  deletePart() {
    if (this.tools.isNetwork()) {
      let postData = new FormData();

      postData.append('agentid', this.Agentid);

      this.tools.openLoader();
      this.apiService.deleteAgent(postData).subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        this.getAgentList();

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
  async deleteAlert(message, btnYes, btnNo) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: btnNo ? btnNo : 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: btnYes ? btnYes : 'Yes',
          handler: () => {
            this.deletePart();
          }
        }
      ], backdropDismiss: true
    });
    return await alert.present();
  }

  getAgentList() {
    if (this.tools.isNetwork()) {
      this.tools.openLoader();
      this.apiService.AgentList().subscribe(data => {
        this.tools.closeLoader();

        let res: any = data;
        console.log(' agent > ', res);
        this.AgentList = res.data.Agent;
        this.itemsAll = res.data.Agent;

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

  // For Filter
  async ionChange(){
    this.AgentList = await this.itemsAll;
    const searchTerm =this.AgentName;  
    if (!searchTerm) {
      return;
    }
  
    this.AgentList = this.AgentList.filter(currentDraw => {
      if (currentDraw.agentname && searchTerm) {
        return ((currentDraw.agentname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (currentDraw.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)|| (currentDraw.phone.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
      }
    });
  }
}
