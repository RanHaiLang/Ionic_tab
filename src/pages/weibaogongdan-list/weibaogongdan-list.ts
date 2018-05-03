import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, App, Nav} from 'ionic-angular';
import {WeibaogongdanPage} from "../weibaogongdan/weibaogongdan";
import {HomePage} from "../home/home";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the WeibaogongdanListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weibaogongdan-list',
  templateUrl: 'weibaogongdan-list.html',
})
export class WeibaogongdanListPage {

  @ViewChild(Nav) nav: Nav;
  BeijianList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App) {
    this.BeijianList.push({"code":"123456","name1":"的的大幅度发发发","name2":"刚刚","type":"故障维修"},
      {"code":"123456","name1":"的的大幅度发发发","name2":"刚刚","type":"故障维修"},
      {"code":"123456","name1":"的的大幅度发发发","name2":"刚刚","type":"故障维修"})
  }

  backPage(){
    //this.navCtrl.setRoot(TabsPage)
    this.app.getRootNav().setRoot(TabsPage);
  }
  getItems($event){

  }

  goWeibaogongdan(){
    console.log("goWeibaogongdan")
    this.navCtrl.push(WeibaogongdanPage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WeibaogongdanListPage');
  }

}
