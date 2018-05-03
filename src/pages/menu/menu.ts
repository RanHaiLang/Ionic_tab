import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {NativeService} from "../../prodivers/nativeService";
import {HttpService} from "../../prodivers/httpService";
import {Storage} from "@ionic/storage";
import {YufangxingweihugongdanListPage} from "../yufangxingweihugongdan-list/yufangxingweihugongdan-list";
import {XunzhangongdanListPage} from "../xunzhangongdan-list/xunzhangongdan-list";
import {XiangmugaizaogongdanListPage} from "../xiangmugaizaogongdan-list/xiangmugaizaogongdan-list";
import {XiaoweixiugongdanListPage} from "../xiaoweixiugongdan-list/xiaoweixiugongdan-list";
import {JiuzhengxingweixiugongdanListPage} from "../jiuzhengxingweixiugongdan-list/jiuzhengxingweixiugongdan-list";
import {GongzuoxukezhengListPage} from "../gongzuoxukezheng-list/gongzuoxukezheng-list";

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  username:string;
  buttonshow:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public menuCtrl:MenuController,public nativeService:NativeService,
              public storage:Storage,public httpService:HttpService) {
    this.storage.get("username").then((val)=>{
      this.username = val;
      if(!this.nativeService.isConnecting()) {//没网络时
        this.u = false;
      }else {
        this.userView();
      }
    })

  }

  u:boolean;
  userView(){
    var url = this.httpService.url+"/appUser/VcappScreens?username="+this.username;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.buttonshow = data['result'];
      this.u=true;
    })
  }
  //打开新页面
  OpenPage(page,url){
    this.storage.set("url",url)
    this.navCtrl.push(page)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
