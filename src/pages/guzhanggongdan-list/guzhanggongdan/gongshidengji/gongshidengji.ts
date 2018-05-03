import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Nav, App} from 'ionic-angular';
import {GuzhanggongdanListPage} from "../../guzhanggongdan-list";
import {AddGongshidengjiPage} from "./add-gongshidengji/add-gongshidengji";

/**
 * Generated class for the GongshidengjiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gongshidengji',
  templateUrl: 'gongshidengji.html',
})
export class GongshidengjiPage {
  @ViewChild(Nav) nav: Nav;
  gongshidengji:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App) {
    this.gongshidengji.push(
      {"code":"123456","name":"闫宏伟","hour":"0.21","time":"2017-08-22"},
      {"code":"123456","name":"闫宏伟","hour":"0.21","time":"2017-08-22"},
      {"code":"123456","name":"闫宏伟","hour":"0.21","time":"2017-08-22"},
      {"code":"123456","name":"闫宏伟","hour":"0.21","time":"2017-08-22"},
      {"code":"123456","name":"闫宏伟","hour":"0.21","time":"2017-08-22"},
      {"code":"123456","name":"闫宏伟","hour":"0.21","time":"2017-08-22"})
  }

  backPage(){
    this.navCtrl.push(GuzhanggongdanListPage);
  }

  goAddGongshidengji(){
    this.navCtrl.push(AddGongshidengjiPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GongshidengjiPage');
  }

}
