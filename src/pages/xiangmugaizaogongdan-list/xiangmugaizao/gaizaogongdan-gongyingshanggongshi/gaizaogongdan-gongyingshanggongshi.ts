import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {XiangmugaizaogongdanListPage} from "../../xiangmugaizaogongdan-list";

/**
 * Generated class for the GaizaogongdanGongyingshanggongshiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gaizaogongdan-gongyingshanggongshi',
  templateUrl: 'gaizaogongdan-gongyingshanggongshi.html',
})
export class GaizaogongdanGongyingshanggongshiPage {

  gongshilist:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.gongshilist.push(
      {'xuhao':'1008692',"renwuhao":"255454","shuoming":"详细工作说明"},
      {'xuhao':'1008692',"renwuhao":"255454","shuoming":"详细工作说明"},
      {'xuhao':'1008692',"renwuhao":"255454","shuoming":"详细工作说明"})
  }

  backPage(){
    this.navCtrl.push(XiangmugaizaogongdanListPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GaizaogongdanGongyingshanggongshiPage');
  }

}
