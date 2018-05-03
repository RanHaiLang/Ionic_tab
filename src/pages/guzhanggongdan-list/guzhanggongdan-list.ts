import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, App} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {GuzhanggongdanPage} from "./guzhanggongdan/guzhanggongdan";

/**
 * Generated class for the GuzhanggongdanListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guzhanggongdan-list',
  templateUrl: 'guzhanggongdan-list.html',
})
export class GuzhanggongdanListPage {

  GuZhangList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App) {
    this.GuZhangList.push({"code":"123456","name1":"的的大幅度发发发的点点滴滴","name2":"刚刚","type":"故障维修"},
      {"code":"123456","name1":"的的大幅度发发发","name2":"刚刚","type":"故障维修"},
      {"code":"123456","name1":"的的大幅度发发发","name2":"刚刚","type":"故障维修"})
  }

  goGuzhanggongdan(){
    this.navCtrl.push(GuzhanggongdanPage)
  }
  backPage(){
    //this.navCtrl.setRoot(TabsPage);
    this.app.getRootNav().setRoot(TabsPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GuzhanggongdanListPage');
  }

}
