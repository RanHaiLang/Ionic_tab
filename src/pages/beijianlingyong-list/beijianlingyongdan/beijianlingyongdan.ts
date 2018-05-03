import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Nav, MenuController} from 'ionic-angular';
import {LingyongdanMessagePage} from "./lingyongdan-message/lingyongdan-message";
import {BeijianmingxiPage} from "./beijianmingxi/beijianmingxi";
import {ShenpiyijianPage} from "./shenpiyijian/shenpiyijian";

/**
 * Generated class for the BeijianlingyongdanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beijianlingyongdan',
  templateUrl: 'beijianlingyongdan.html',
})
export class BeijianlingyongdanPage {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LingyongdanMessagePage;
  beijianpages: Array<{titles: string, component: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController) {
    this.menuCtrl.enable(true,"beijianlingyongId")
    this.menuCtrl.enable(false,"weibaogongdanId")
    this.beijianpages = [
      { titles: '领用单信息', component: LingyongdanMessagePage },
      { titles: '审批意见', component: ShenpiyijianPage},
      { titles: '备件明细', component: BeijianmingxiPage}
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BeijianlingyongdanPage');
    console.log(this.beijianpages);
  }

}
