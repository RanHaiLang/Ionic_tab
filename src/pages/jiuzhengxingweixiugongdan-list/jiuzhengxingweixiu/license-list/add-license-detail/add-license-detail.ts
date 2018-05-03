import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {LicensePage} from "../../../../../shared/license/license";
import {HttpService} from "../../../../../prodivers/httpService";
import {NativeService} from "../../../../../prodivers/nativeService";
import {LicenseListPage} from "../license-list";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the AddLicenseDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-license-detail',
  templateUrl: 'add-license-detail.html',
})
export class AddLicenseDetailPage {

  licenseDetail:any=[];
  evt_rstatus:string;
  evt_code:string;
  username:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,
              public httpService:HttpService,public nativeService:NativeService,public storage:Storage) {
    this.evt_code = this.navParams.get("evt_code");
    this.evt_rstatus = this.navParams.get("evt_rstatus");
    this.storage.get("username").then((res)=>{
      this.username = res;
    })
  }
  backPage(){
    this.navCtrl.pop();
  }

  getLicense(){
    let modal = this.modalCtrl.create(LicensePage,{
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        this.licenseDetail.pev_permit="";
        this.licenseDetail.pev_permitdesc="";
      }else {
        if(data.com_code!=undefined){
          this.licenseDetail.pev_permit=data.com_code;
          this.licenseDetail.pev_permitdesc=data.com_desc;
        }
      }

    });
    modal.present();
  }


  submitLicenseDetail(){
    //非空判断
    if(this.licenseDetail.pev_permit==""||this.licenseDetail.pev_permit==null||
      this.licenseDetail.pev_active==""||this.licenseDetail.pev_active==null){
      this.nativeService.showToast("请填写*号部分")
    }else {
      var url = this.httpService.url + "/appEvent/inertperevt";
      let body = "pev_permit="+this.licenseDetail.pev_permit+"&pev_event="+this.evt_code+"&pev_createdby="+this.username;
      this.httpService.post(url,body).subscribe((res)=>{
        let data = res.json();
        this.nativeService.showToast(data['message']);
        if(data['resultCode']==1){
          this.navCtrl.setRoot(LicenseListPage,{
            key:'detail',
            evt_code:this.evt_code,
            evt_rstatus:this.evt_rstatus
          })
        }
      })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLicenseDetailPage');
  }

}
