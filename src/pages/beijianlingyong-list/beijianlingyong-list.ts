import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, App} from 'ionic-angular';
import {BeijianlingyongdanPage} from "./beijianlingyongdan/beijianlingyongdan";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the BeijianlingyongListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beijianlingyong-list',
  templateUrl: 'beijianlingyong-list.html',
})
export class BeijianlingyongListPage {

  BeijianList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App) {
    this.BeijianList.push({"code":"123456","tibaoren":"杨坤","name1":"的的大幅度发发发","name2":"刚刚","type":"故障维修"},
      {"code":"123456","tibaoren":"杨坤","name1":"的的大幅度发发发","name2":"刚刚","type":"故障维修"},
      {"code":"123456","tibaoren":"杨坤","name1":"的的大幅度发发发","name2":"刚刚","type":"故障维修"})
  }

  goBeijianlingyongdan(){
    this.navCtrl.push(BeijianlingyongdanPage);
  }
  backPage(){
    //this.navCtrl.setRoot(TabsPage)
    this.app.getRootNav().setRoot(TabsPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BeijianlingyongListPage');
  }

}
