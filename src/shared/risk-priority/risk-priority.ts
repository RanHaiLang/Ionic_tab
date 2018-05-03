import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpService} from "../../prodivers/httpService";

/**
 * Generated class for the RiskPriorityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//风险等级、优先级
@Component({
  selector: 'page-risk-priority',
  templateUrl: 'risk-priority.html',
})
export class RiskPriorityPage {

  riskPriorty:any=[];
  title:string;
  key:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpService,public viewCtrl:ViewController) {
    this.title = this.navParams.get("title")
    this.key = this.navParams.get("key")
    this.getRiskPriority()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RiskPriorityPage');
  }

  getRiskPriority(){
    var url = this.httpService.url + "/device/getfxdj?type="+this.key;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.riskPriorty = data['result'];
    })
  }
  dismiss(y){
    this.viewCtrl.dismiss(y);
  }
}
