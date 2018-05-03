import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WeibaogongdanListPage} from "../../weibaogongdan-list/weibaogongdan-list";

/**
 * Generated class for the XundianjianxiangPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xundianjianxiang',
  templateUrl: 'xundianjianxiang.html',
})
export class XundianjianxiangPage {

  xundianjianxiangList:any=[]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.xundianjianxiangList.push(
      {"content":"检查确认光栅尺过滤装置的压力是否在规定范围;(1.0+/-0.3)bar","message":"超出正常范围需要安排检修工单","return":"true","workorder":"false","time":"2017-08-22 16:58"})
  }

  backPage(){
    this.navCtrl.push(WeibaogongdanListPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad XundianjianxiangPage');
  }

}
