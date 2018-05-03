import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpService} from "../../prodivers/httpService";

/**
 * Generated class for the SelectHuodongPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-select-huodong',
  templateUrl: 'select-huodong.html',
})
export class SelectHuodongPage {

  huodongList:any=[];
  evt_code:string;
  f:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpService:HttpService,public viewCtrl:ViewController) {
    this.evt_code = this.navParams.get("evt_code");
    this.getHuodong();
  }

  getHuodong(){
    var url = this.httpService.url+"/actBh/listact?evt_code="+this.evt_code;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.huodongList = data['result'];
    })
  }
  dismiss(y){
    this.viewCtrl.dismiss(y);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectHuodongPage');
  }

}
