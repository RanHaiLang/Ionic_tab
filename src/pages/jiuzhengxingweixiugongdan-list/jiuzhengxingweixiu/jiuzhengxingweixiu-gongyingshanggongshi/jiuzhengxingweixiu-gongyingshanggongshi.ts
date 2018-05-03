import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {JiuzhengxingweixiugongdanListPage} from "../../jiuzhengxingweixiugongdan-list";

/**
 * Generated class for the JiuzhengxingweixiuGongyingshanggongshiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jiuzhengxingweixiu-gongyingshanggongshi',
  templateUrl: 'jiuzhengxingweixiu-gongyingshanggongshi.html',
})
export class JiuzhengxingweixiuGongyingshanggongshiPage {

  gongshilist:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.gongshilist.push(
      {'xuhao':'1008692',"renwuhao":"255454","shuoming":"详细工作说明"},
      {'xuhao':'1008692',"renwuhao":"255454","shuoming":"详细工作说明"},
      {'xuhao':'1008692',"renwuhao":"255454","shuoming":"详细工作说明"})
  }

  backPage(){
    this.navCtrl.push(JiuzhengxingweixiugongdanListPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad JiuzhengxingweixiuGongyingshanggongshiPage');
  }

}
