import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Nav, App, MenuController} from 'ionic-angular';
import {MenuPage} from "../menu/menu";
import {GongdanMessage} from "./gongdan_Message/gongdan_Message";
import {GongzuoJilu} from "./gongzuojilu/gongzuojilu";
import {GongshidengjiPage} from "./gongshidengji/gongshidengji";
import {BeijianbaoPage} from "./beijianbao/beijianbao";
import {WeixiuyongliaoPage} from "./weixiuyongliao/weixiuyongliao";
import {ShenpiyijianPage} from "./shenpiyijian/shenpiyijian";
import {RenwubuzhouPage} from "./renwubuzhou/renwubuzhou";
import {XundianjianxiangPage} from "./xundianjianxiang/xundianjianxiang";

/**
 * Generated class for the WeibaogongdanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weibaogongdan',
  templateUrl: 'weibaogongdan.html',
})
export class WeibaogongdanPage {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = GongdanMessage;
  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App,public menuCtrl:MenuController) {
    this.menuCtrl.enable(true,"weibaogongdanId")
    this.menuCtrl.enable(false,"beijianlingyongId")
    this.pages = [
      { title: '工单信息', component: GongdanMessage },
      { title: '工作记录', component: GongzuoJilu },
      { title: '工时登记', component: GongshidengjiPage },
      { title: '备件包', component: BeijianbaoPage },
      { title: '维修用料', component: WeixiuyongliaoPage },
      { title: '审批意见', component: ShenpiyijianPage },
      { title: '任务步骤', component: RenwubuzhouPage },
      { title: '巡点检项', component: XundianjianxiangPage }
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    //this.app.getRootNav().setRoot(page.component)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WeibaogongdanPage');
    console.log(this.pages);
  }

}
