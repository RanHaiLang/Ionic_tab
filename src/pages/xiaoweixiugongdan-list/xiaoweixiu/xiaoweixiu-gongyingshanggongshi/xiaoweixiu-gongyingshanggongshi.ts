import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {XiaoweixiugongdanListPage} from "../../xiaoweixiugongdan-list";

/**
 * Generated class for the XiaoweixiuGongyingshanggongshiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xiaoweixiu-gongyingshanggongshi',
  templateUrl: 'xiaoweixiu-gongyingshanggongshi.html',
})
export class XiaoweixiuGongyingshanggongshiPage {

  gongshilist:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.gongshilist.push(
      {'xuhao':'1008692',"renwuhao":"255454","shuoming":"详细工作说明"},
      {'xuhao':'1008692',"renwuhao":"255454","shuoming":"详细工作说明"},
      {'xuhao':'1008692',"renwuhao":"255454","shuoming":"详细工作说明"})
  }

  backPage(){
    this.navCtrl.push(XiaoweixiugongdanListPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad XiaoweixiuGongyingshanggongshiPage');
  }

}
