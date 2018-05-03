import {Component, ViewChild} from '@angular/core';
import {NavController, Nav, AlertController, App} from 'ionic-angular';
import {MenuPage} from "../menu/menu";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import {AboutUsPage} from "../about-us/about-us";
import {ModifyPasswordPage} from "../modify-password/modify-password";
import {HttpService} from "../../prodivers/httpService";
import {NativeService} from "../../prodivers/nativeService";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = MenuPage;
  pages: Array<{title: string, component: any}>;
  username:string=""
  constructor(public navCtrl: NavController,public storage:Storage,public alertCtrl:AlertController,
                public httpService:HttpService,public app:App,public nativeService:NativeService) {
    this.storage.get("username").then((res)=>{
      this.username = res;
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goAboutus(){
    this.navCtrl.push(AboutUsPage);
  }

  goModify(){
    this.navCtrl.push(ModifyPasswordPage)
  }
  loginOut(){
    //操作确认提示
    let alert = this.alertCtrl.create({
      title: '操作提示',
      message: '确认退出当前登录用户？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            return ;
          }
        },
        {
          text: '确定',
          handler: () => {
            this.storage.set("username","");
            this.storage.set("password","");
            window['plugins'].jPushPlugin.deleteAlias({ sequence: 1 },
              (result) => {
                var sequence = result.sequence
              }, (error) => {
                var sequence = error.sequence
                var errorCode = error.code
              })

            if (this.nativeService.isIos()) {
              window['plugins'].jPushPlugin.setBadge(0)
              window['plugins'].jPushPlugin.setDebugModeFromIos();
              window['plugins'].jPushPlugin.setApplicationIconBadgeNumber(0);
            }
            //this.navCtrl.push(LoginPage)
            this.app.getRootNav().setRoot(LoginPage,{

            });
          }
        }
      ]
    });
    alert.present();
  }

}
