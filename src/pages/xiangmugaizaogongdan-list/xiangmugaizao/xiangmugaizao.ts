import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Nav, MenuController} from 'ionic-angular';
import {GaizaogongdanMessagePage} from "./gaizaogongdan-message/gaizaogongdan-message";
import {GaizaogongdanHuodongPage} from "./gaizaogongdan-huodong/gaizaogongdan-huodong";
import {GaizaogongdanGongyingshanggongshiPage} from "./gaizaogongdan-gongyingshanggongshi/gaizaogongdan-gongyingshanggongshi";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the XiangmugaizaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xiangmugaizao',
  templateUrl: 'xiangmugaizao.html',
})
export class XiangmugaizaoPage {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = GaizaogongdanMessagePage;
  pages:Array<{title: string, component: any}>;

  xmgzDetail:any=[];
  xmgzParams:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController,public storage:Storage) {
    this.menuCtrl.enable(true,"xiangmugaizaoId");
    this.menuCtrl.enable(false,"jiuzhengxingId");
    this.menuCtrl.enable(false,"weihugongdanId");
    this.menuCtrl.enable(false,"xunzhangongdanId");
    this.menuCtrl.enable(false,"xiaoweixiuId");
    this.menuCtrl.enable(false,"gongzuoxukeId");
    this.pages=[
      {title:'工单信息',component:GaizaogongdanMessagePage},
      {title:'活动',component:GaizaogongdanHuodongPage}
      /*{title:'供应商工时',component:GaizaogongdanGongyingshanggongshiPage}*/
    ]

    this.xmgzParams = {
      xmgzDetail:this.navParams.get("xmgzDetail")
    }
  }

  openPage(page) {
    this.storage.get("xmgzDetail").then((res)=>{
      this.nav.setRoot(page.component,{
        xmgzDetail:res
      });
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad XiangmugaizaoPage');
  }

}
