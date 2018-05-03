import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Nav, MenuController} from 'ionic-angular';
import {XiaoweixiugongdanMessagePage} from "./xiaoweixiugongdan-message/xiaoweixiugongdan-message";
import {XiaoweixiuGongyingshanggongshiPage} from "./xiaoweixiu-gongyingshanggongshi/xiaoweixiu-gongyingshanggongshi";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the XiaoweixiuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xiaoweixiu',
  templateUrl: 'xiaoweixiu.html',
})
export class XiaoweixiuPage {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = XiaoweixiugongdanMessagePage;
  pages:Array<{title: string, component: any}>;

  xwxDetail:any=[];
  xwxParams:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController,public storage:Storage) {
    this.menuCtrl.enable(true,"xiaoweixiuId");
    this.menuCtrl.enable(false,"xiangmugaizaoId");
    this.menuCtrl.enable(false,"jiuzhengxingId");
    this.menuCtrl.enable(false,"weihugongdanId");
    this.menuCtrl.enable(false,"xunzhangongdanId");
    this.menuCtrl.enable(false,"gongzuoxukeId");
    this.pages=[
      {title:'工单信息',component:XiaoweixiugongdanMessagePage},
      /*{title:'供应商工时',component:XiaoweixiuGongyingshanggongshiPage}*/
    ]
    this.xwxParams = {
      xwxDetail:this.navParams.get("xwxDetail")
    }
  }

  openPage(page) {
    this.storage.get("xwxDetail").then((res)=>{
      this.nav.setRoot(page.component,{
        xwxDetail:res
      });
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad XiaoweixiuPage');
  }

}
