import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Nav, MenuController} from 'ionic-angular';
import {GongdanMessagePage} from "./gongdan-message/gongdan-message";
import {HuodongPage} from "./huodong/huodong";
import {GongshidengjiPage} from "./gongshidengji/gongshidengji";
import {GongyingshanggongshiPage} from "./gongyingshanggongshi/gongyingshanggongshi";
import {ShebeiPage} from "./shebei/shebei";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the YufangxingweihugongdanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-yufangxingweihugongdan',
  templateUrl: 'yufangxingweihugongdan.html',
})
export class YufangxingweihugongdanPage {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = GongdanMessagePage;
  pages:Array<{title: string, component: any}>;

  gongdanDetail:any=[];

  codeParams:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController,public storage:Storage) {
    this.menuCtrl.enable(true,"weihugongdanId");
    this.menuCtrl.enable(false,"xunzhangongdanId");
    this.menuCtrl.enable(false,"xiangmugaizaoId");
    this.menuCtrl.enable(false,"xiaoweixiuId");
    this.menuCtrl.enable(false,"jiuzhengxingId");
    this.menuCtrl.enable(false,"gongzuoxukeId");
    this.pages=[
      {title:'工单信息',component:GongdanMessagePage},
      {title:'活动',component:HuodongPage},
      {title:'工时登记',component:GongshidengjiPage},
      /*{title:'供应商工时',component:GongyingshanggongshiPage},*/
      {title:'设备',component:ShebeiPage}
      ];
    this.codeParams={
      yfxwhDetail:this.navParams.get("yfxwhDetail")
    }
  }

  openPage(page) {
    this.storage.get("yfxwhDetail").then((res)=>{//获取详细信息，不能直接this.gongdanDetail,得到的值是上一次页面的值，目前还没找到解决的办法，只能存储到本地再取
      this.gongdanDetail = res
      this.nav.setRoot(page.component,{
        yfxwhDetail:this.gongdanDetail
      });
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad YufangxingweihugongdanPage');
  }

}
