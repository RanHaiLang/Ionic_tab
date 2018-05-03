import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Nav, MenuController} from 'ionic-angular';
import {GongzuoxukezhengMessagePage} from "./gongzuoxukezheng-message/gongzuoxukezheng-message";
import {GongzuoxukezhengXukejianchaxiangPage} from "./gongzuoxukezheng-xukejianchaxiang/gongzuoxukezheng-xukejianchaxiang";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the GongzuoxukezhengPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gongzuoxukezheng',
  templateUrl: 'gongzuoxukezheng.html',
})
export class GongzuoxukezhengPage {

  @ViewChild(Nav) nav: Nav;
  rootPage: any =GongzuoxukezhengMessagePage;
  pages:Array<{title: string, component: any}>;
  gzxkzgdDetail:any=[];
  xkzParams:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController,public storage:Storage) {
    this.menuCtrl.enable(true,"gongzuoxukeId");
    this.menuCtrl.enable(false,"xiaoweixiuId");
    this.menuCtrl.enable(false,"xiangmugaizaoId");
    this.menuCtrl.enable(false,"jiuzhengxingId");
    this.menuCtrl.enable(false,"weihugongdanId");
    this.menuCtrl.enable(false,"xunzhangongdanId");
    this.pages=[
      {title:'许可证信息',component:GongzuoxukezhengMessagePage},
      {title:'许可证检查项',component:GongzuoxukezhengXukejianchaxiangPage}]

    this.xkzParams={
      gzxkzgdDetail:this.navParams.get("gzxkzgdDetail")
    }
  }

  openPage(page) {
    this.storage.get("gzxkzgdDetail").then((res)=>{
      this.gzxkzgdDetail = res;
      this.nav.setRoot(page.component,{
        gzxkzgdDetail:this.gzxkzgdDetail
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongzuoxukezhengPage');
  }
  ionViewDidEnter(){//进入了一个页面且变成了当前的激活页面，该事件不管是第一次进入还是缓存后进入都将执行。

  }

}
