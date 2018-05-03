import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Nav, MenuController} from 'ionic-angular';
import {GongdanMessagePage} from "./gongdan-message/gongdan-message";
import {YouzhanListPage} from "./youzhan-list/youzhan-list";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the XunzhangongdanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xunzhangongdan',
  templateUrl: 'xunzhangongdan.html',
})
export class XunzhangongdanPage {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = GongdanMessagePage;
  pages:Array<{title: string, component: any}>;

  xzgdDetail:any=[];
  xunzhanParam:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController,public storage:Storage) {
    this.menuCtrl.enable(true,"xunzhangongdanId");
    this.menuCtrl.enable(false,"xiaoweixiuId");
    this.menuCtrl.enable(false,"xiangmugaizaoId");
    this.menuCtrl.enable(false,"jiuzhengxingId");
    this.menuCtrl.enable(false,"weihugongdanId");
    this.menuCtrl.enable(false,"gongzuoxukeId");
    this.pages=[
      {title:'工单信息',component:GongdanMessagePage},
      {title:'油站信息',component:YouzhanListPage}
    ];
    this.xunzhanParam={
      xzgdDetail:this.navParams.get("xzgdDetail")
    }
  }

  openPage(page) {
    this.storage.get("xzgdDetail").then((res)=>{
      this.xzgdDetail = res;
      this.nav.setRoot(page.component,{
        xzgdDetail:this.xzgdDetail
      });
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad XunzhangongdanPage');
  }

}
