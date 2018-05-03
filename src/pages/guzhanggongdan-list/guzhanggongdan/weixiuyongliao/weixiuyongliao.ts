import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GuzhanggongdanListPage} from "../../guzhanggongdan-list";

/**
 * Generated class for the WeixiuyongliaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weixiuyongliao',
  templateUrl: 'weixiuyongliao.html',
})
export class WeixiuyongliaoPage {

  weixiuyongliaoList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.weixiuyongliaoList.push(
      {"code":"100598","name":"球阀","version":"DH40","guige":"DH40;PN16","fnumber":"发放量","ftime":"2017-08-22 9:51","ck":"装备公司-2号厂备件库","hw":"A01-05-04"})
  }

  backPage(){
    this.navCtrl.push(GuzhanggongdanListPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WeixiuyongliaoPage');
  }

}
