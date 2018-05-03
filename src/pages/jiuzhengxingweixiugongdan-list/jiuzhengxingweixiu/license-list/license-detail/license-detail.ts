import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from "../../../../../prodivers/httpService";
import {NativeService} from "../../../../../prodivers/nativeService";
import {LicenseListPage} from "../license-list";

/**
 * Generated class for the LicenseDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-license-detail',
  templateUrl: 'license-detail.html',
})
export class LicenseDetailPage {

  licenseDetail:any=[];
  evt_rstatus:string;
  evt_code:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpService,
                public nativeService:NativeService) {
    this.licenseDetail = this.navParams.get("licenseDetail");
    this.evt_code = this.navParams.get("evt_code");
    this.evt_rstatus = this.navParams.get("evt_rstatus");
  }

  backPage(){
    this.navCtrl.pop();
  }

  submitLicenseDetail(){
    var url = this.httpService.url + "/appEvent/updateperevt";
    let body = "pev_code="+this.licenseDetail.pev_code+"&pev_active="+this.licenseDetail.pev_active;
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad LicenseDetailPage');
  }

}
