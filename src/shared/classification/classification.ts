import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpService} from "../../prodivers/httpService";

/**
 * Generated class for the ClassificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-classification',
  templateUrl: 'classification.html',
})
export class ClassificationPage {

  classification:any=[];
  f:boolean=false;
  fltype:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl:ViewController,public httpService:HttpService) {
    this.fltype = this.navParams.get("fltype");
    this.getLicenseCategory();
  }

  dismiss(y){
    this.viewCtrl.dismiss(y);
  }

  getLicenseCategory(){
    var url = this.httpService.url + "/device/flByPage?fltype="+this.fltype;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.classification = data['result']
    })
  }

  //下拉刷新
  doRefresh(refresher){
    var url = this.httpService.url + "/device/flByPage?fltype=y";

    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.classification = data['result'];
      })
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassificationPage');
  }

}
