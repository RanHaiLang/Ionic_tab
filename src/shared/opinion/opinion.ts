import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpService} from "../../prodivers/httpService";
import {Storage} from "@ionic/storage";
import {NativeService} from "../../prodivers/nativeService";

/**
 * Generated class for the OpinionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-opinion',
  templateUrl: 'opinion.html',
})
export class OpinionPage {

  username:string;
  opinion:string="";
  code:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,
              public httpService:HttpService,public storage:Storage,public nativeService:NativeService) {
    this.code = this.navParams.get("evt_code");
    this.storage.get("username").then((res)=>{
      this.username = res;
    })
  }

  dismiss(){
    this.viewCtrl.dismiss(0);
  }

  submitOpinion(){
    if(this.opinion==""){
      this.nativeService.showToast("请填写审批意见！")
    }else {
      var url = this.httpService.url + "/adDetail/insertevtadd";
      let body = "add_user="+this.username+"&add_text="+this.opinion+"&add_code="+this.code;
      this.httpService.post(url,body).subscribe((res)=>{
        let data = res.json()
        if(data['resultCode']==1){
          this.viewCtrl.dismiss(1);
        }else {
          this.nativeService.showToast(data['message']);
        }
      })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OpinionPage');
  }

}
