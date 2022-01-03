import { ApiService } from '../../services/api.service-new';
import { Tools } from '../../shared/tools';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/EventService';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-editmachine',
  templateUrl: 'editmachine.page.html',
  styleUrls: ['editmachine.page.scss'],
})
export class EditMachinePage {
  loginForm: FormGroup;
  image1: any;
  pdf: any;
  MachineID = '';
  MachineName = '';

  constructor(public tools: Tools, private route: ActivatedRoute,
    public platform: Platform,
    public formBuilder: FormBuilder, private camera: Camera,public imagePicker: ImagePicker,
    public actionSheetController: ActionSheetController,
    private eventService: EventService, private apiService: ApiService, private router: Router) {

      this.route.params
      .subscribe((params) => {
        console.log('params =>', params.MachineID);
        console.log('params =>', params.MachineName);
        this.MachineID = params.MachineID;
        this.MachineName = params.MachineName;
        this.loginForm = this.formBuilder.group({
          mName: [this.MachineName, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
        });
      });
      this.pdf='Machine.pdf';
      this.image1='Machine.png';
   
  }

  addmachine() {

    console.log("calll >>>")
    let mName = this.loginForm.get('mName').value;

    var msg = ''
  
    if (mName == "") {
      msg = msg + "Enter your Machine name<br />";
    }
   
    // if(this.pdf == undefined){
    //   msg = msg + "Select Machine PDF<br />";

    // }
    // if(this.image1 == undefined){
    //   msg = msg + "Select Machine Image<br />";

    // }


    if (msg != '') {
      this.tools.openAlert(msg);
    } else {
          if (this.tools.isNetwork()) {
            let  postData = new FormData();
  
            postData.append('MachineID', this.MachineID);
            postData.append('MachineName', mName);
            postData.append('MachinePic', this.image1=='Machine.png'?'':this.image1);
            postData.append('SparePartsURL', this.pdf=='Machine.pdf'?'':this.pdf);
            
            this.tools.openLoader();
            this.apiService.EditMachine(postData).subscribe(response => {
              this.tools.closeLoader();
              let res: any = response;
               console.log('// Api Response ',res);

               //this.router.navigateByUrl('/home', { replaceUrl: true });
              this.tools.backPage();
            

            }, (error: Response) => {
              this.tools.closeLoader();
              let err: any = error;
              // console.log('Api Error ',err.error);
              // let msg = err.error.text.replace('(','').replace(')','');
              // this.tools.presentAlert('',JSON.parse(msg).msg);
              console.log('Api Error ', err);

            });
          } else {
            this.tools.closeLoader();
          }
        }
    


  }

  isPostImageAdd = false;
  isPostImageEdit = false;
  onFileChange(event, isEdit=false) {
    if (event.target.files && event.target.files.length > 0) {
      
      const file = event.target.files[0];
      const fileSizeInKB = Math.round(file.size / 1024);
      if (fileSizeInKB >= 5012) {
          //this.toastr.error("Allow only 5 mb image size", "Error");
          return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      if(isEdit){
        this.isPostImageEdit = true;
        //this.PEditControl.post_image.setValue(file);
      }else{
        this.isPostImageAdd = true;
        //this.control.post_image.setValue(file);
       this.image1=file;
        
      }
    }
  }

  
  isPostDocAdd = false;
  isPostDocEdit = false;
  onDocChange(event, isEdit=false){
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files[0];
      const fileSizeInKB = Math.round(files.size / 1024);
      console.log("files >>"+files);
      console.log("fileSizeInKB >>"+fileSizeInKB);
      if (fileSizeInKB >= 10025) {
          //this.toastr.error("Allow only 10 mb document size", "Error");
          return;
      }
      if(isEdit){
        this.isPostDocEdit = true;
        //this.PEditControl.post_document.setValue(files);
      }else{
        this.isPostDocAdd = true;
        //this.control.post_document.setValue(files);
        this.pdf=files;
      }
    }
  }
}
