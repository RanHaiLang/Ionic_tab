import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {YufangxingweihugongdanListPage} from "../../yufangxingweihugongdan-list";

/**
 * Generated class for the GongyingshanggongshiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gongyingshanggongshi',
  templateUrl: 'gongyingshanggongshi.html',
})
export class GongyingshanggongshiPage {

  gongshilist:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.gongshilist.push(
      {'xuhao':'1008692',"renwuhao":"255454","shuoming":"详细工作说明"},
      {'xuhao':'1008692',"renwuhao":"255454","shuoming":"详细工作说明"},
      {'xuhao':'1008692',"renwuhao":"255454","shuoming":"详细工作说明"})
  }

  backPage(){
    this.navCtrl.push(YufangxingweihugongdanListPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GongyingshanggongshiPage');
  }

}
