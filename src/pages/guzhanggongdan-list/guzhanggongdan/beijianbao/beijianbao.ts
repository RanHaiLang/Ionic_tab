import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GuzhanggongdanListPage} from "../../guzhanggongdan-list";
import {CreateBeijianlingyongdanPage} from "./create-beijianlingyongdan/create-beijianlingyongdan";
import {CreateWuzijihuaPage} from "./create-wuzijihua/create-wuzijihua";

/**
 * Generated class for the BeijianbaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beijianbao',
  templateUrl: 'beijianbao.html',
})
export class BeijianbaoPage {
  beijianbaoList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.beijianbaoList.push(
      {"code":"123456","name":"球阀","DH40":"","guige":"DH40","znumber":"2","knumber":"8"},
      {"code":"123456","name":"球阀","DH40":"","guige":"DH40","znumber":"2","knumber":"8"},
      {"code":"123456","name":"球阀","DH40":"","guige":"DH40","znumber":"2","knumber":"8"})
  }

  backPage(){
    this.navCtrl.push(GuzhanggongdanListPage);
  }
  goCreate_wuzijihua(){
    this.navCtrl.push(CreateWuzijihuaPage);
  }
  goCreate_lingyongOrder(){
    this.navCtrl.push(CreateBeijianlingyongdanPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BeijianbaoPage');
  }

}
