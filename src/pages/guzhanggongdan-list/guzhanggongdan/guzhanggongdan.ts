import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController, Nav} from 'ionic-angular';
import {GongdanMessagePage} from "./gongdan-message/gongdan-message";
import {WeixiujiluPage} from "./weixiujilu/weixiujilu";
import {GongshidengjiPage} from "./gongshidengji/gongshidengji";
import {BeijianbaoPage} from "./beijianbao/beijianbao";
import {WeixiuyongliaoPage} from "./weixiuyongliao/weixiuyongliao";
import {ShenpiyijianPage} from "./shenpiyijian/shenpiyijian";

/**
 * Generated class for the GuzhanggongdanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guzhanggongdan',
  templateUrl: 'guzhanggongdan.html',
})
export class GuzhanggongdanPage {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = GongdanMessagePage;
  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController) {
    this.menuCtrl.enable(true,"guzhabggongdanId")
    this.menuCtrl.enable(false,"weibaogongdanId")
    this.menuCtrl.enable(false,"beijianlingyongId")
    this.pages = [
      { title: '工单信息', component: GongdanMessagePage },
      { title: '维修记录', component: WeixiujiluPage},
      { title: '工时登记', component: GongshidengjiPage},
      { title: '备件包', component: BeijianbaoPage },
      { title: '维修用料', component: WeixiuyongliaoPage},
      { title: '审批意见', component: ShenpiyijianPage }
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GuzhanggongdanPage');
  }

}
