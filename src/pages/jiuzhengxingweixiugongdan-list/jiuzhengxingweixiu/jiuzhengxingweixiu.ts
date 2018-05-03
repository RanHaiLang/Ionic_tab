import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Nav, MenuController} from 'ionic-angular';
import {JiuzhengxingweixiugongdanMessagePage} from "./jiuzhengxingweixiugongdan-message/jiuzhengxingweixiugongdan-message";
import {JiuzhengxingweixiuhuodongPage} from "./jiuzhengxingweixiuhuodong/jiuzhengxingweixiuhuodong";
import {JiuzhengxingweixiuGongyingshanggongshiPage} from "./jiuzhengxingweixiu-gongyingshanggongshi/jiuzhengxingweixiu-gongyingshanggongshi";
import {Storage} from "@ionic/storage";
import {LicenseListPage} from "./license-list/license-list";

/**
 * Generated class for the JiuzhengxingweixiuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jiuzhengxingweixiu',
  templateUrl: 'jiuzhengxingweixiu.html',
})
export class JiuzhengxingweixiuPage {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = JiuzhengxingweixiugongdanMessagePage;
  pages:Array<{title: string, component: any}>;

  jzxwxDetail:any=[];
  jzxwxParams:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController,public storage:Storage) {
    this.menuCtrl.enable(true,"jiuzhengxingId");
    this.menuCtrl.enable(false,"weihugongdanId");
    this.menuCtrl.enable(false,"xunzhangongdanId");
    this.menuCtrl.enable(false,"xiangmugaizaoId");
    this.menuCtrl.enable(false,"xiaoweixiuId");
    this.menuCtrl.enable(false,"gongzuoxukeId");
    this.pages=[
      {title:'工单信息',component:JiuzhengxingweixiugongdanMessagePage},
      {title:'活动',component:JiuzhengxingweixiuhuodongPage},
      {title:'许可证清单',component:LicenseListPage},
      /*{title:'供应商工时',component:JiuzhengxingweixiuGongyingshanggongshiPage}*/
    ]

    this.jzxwxParams = {
      jzxwxDetail:this.navParams.get("jzxwxDetail")
    }
  }

  openPage(page) {
    this.storage.get("jzxwxDetail").then((res)=>{
      this.nav.setRoot(page.component,{
        jzxwxDetail:res
      });
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad JiuzhengxingweixiuPage');
  }

}
