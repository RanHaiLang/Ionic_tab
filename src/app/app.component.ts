import {Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Platform, Nav, IonicApp, ToastController, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {NativeService} from "../prodivers/nativeService";
import {TabsPage} from "../pages/tabs/tabs";
import {HttpService} from "../prodivers/httpService";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Storage} from "@ionic/storage";
//declare var window;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild(Nav) nav: Nav;
  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public ionicApp: IonicApp,public toastCtrl: ToastController,
              public nativeService:NativeService,public httpService:HttpService,public cd: ChangeDetectorRef,
              public alertCtrl:AlertController,private iab: InAppBrowser,public storage:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.assertNetwork();//检测网络
      this.registerBackButtonAction();//注册返回按钮事件
      this.initJPush();
      this.VersionUpdate();
    });
  }

  initJPush() {
    //启动极光推送
    /*if (window['plugins'] && 　window['plugins'].jPushPlugin) {
      window['plugins'].jPushPlugin.init();
      document.addEventListener("jpush.receiveNotification", () => {
        this.msgList.push({content:window['plugins'].jPushPlugin.receiveNotification.alert})
      }, false);
    }*/
    window['plugins'].jPushPlugin.init();
    if (this.nativeService.isIos()) {
      window['plugins'].jPushPlugin.setBadge(0)
      window['plugins'].jPushPlugin.setDebugModeFromIos();
      window['plugins'].jPushPlugin.setApplicationIconBadgeNumber(0);
    } else {
      window['plugins'].jPushPlugin.setDebugMode(true);
    }
    this.jPushAddEventListener();
  }
  msgList:Array<any>=[];

  jPushAddEventListener() {
    //判断系统设置中是否允许当前应用推送
    window['plugins'].jPushPlugin.getUserNotificationSettings(result => {
      if (result == 0) {
        console.log('系统设置中已关闭应用推送');
      } else if (result > 0) {
        console.log('系统设置中打开了应用推送');
      }
    });
    //点击通知进入应用程序时会触发的事件
    document.addEventListener("jpush.openNotification", event => {
      let content = this.nativeService.isIos() ? event['aps'].alert : event['alert'];
      this.msgList = content;
      console.log("jpush.openNotification" + content);
      this.nativeService.showAlert("消息提示",content);
    }, false);

    //收到通知时会触发该事件
    document.addEventListener("jpush.receiveNotification", event => {
      let content = this.nativeService.isIos() ? event['aps'].alert : event['alert'];
      this.msgList = content;
      console.log("jpush.receiveNotification" + content);
    }, false);

    //收到自定义消息时触发这个事件
    document.addEventListener("jpush.receiveMessage", event => {
      let message = this.nativeService.isIos() ? event['content'] : event['message'];
      console.log("jpush.receiveMessage" + message);
    }, false);

    //设置标签/别名回调函数
    document.addEventListener("jpush.setTagsWithAlias", event => {
      console.log("onTagsWithAlias");
      let result = "result code:" + event['resultCode'] + " ";
      result += "tags:" + event['tags'] + " ";
      result += "alias:" + event['alias'] + " ";
      console.log(result);
    }, false);

  }

  assertNetwork() {
    if (!this.nativeService.isConnecting()) {
      this.toastCtrl.create({
        message: '未检测到网络,请连接网络',
        showCloseButton: true,
        closeButtonText: '确定'
      }).present();
    }
  }

  registerBackButtonAction() {
    if (!this.nativeService.isAndroid()) {
      return;
    }
    //注册返回按键事件
    this.platform.registerBackButtonAction((): any => {
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      //this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()|| this.ionicApp._overlayPortal.getActive()||this.ionicApp._modalPortal.getActive()
      let activePortal = this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()||this.ionicApp._overlayPortal.getActive()||this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss();
        return;
      }
      let activeVC = this.nav.getActive();
      let page = activeVC.instance;
      if (!(page instanceof TabsPage)) {
        if (!this.nav.canGoBack()) {
          //当前页面为tabs，退出APP
          return this.showExit();
        }
        //当前页面为tabs的子页面，正常返回
        return this.nav.pop();
      }
      let tabs = page.tabs;
      let activeNav = tabs.getSelected();
      if (!activeNav.canGoBack()) {
        //当前页面为tab栏，退出APP
        return this.showExit();
      }
      //当前页面为tab栏的子页面，正常返回
      return activeNav.pop();
    }, 101);
  }
  //双击退出提示框，这里使用Ionic2的ToastController
  showExit() {
    if (this.backButtonPressed) this.platform.exitApp();  //当触发标志为true时，即2秒内双击返回按键则退出APP
    else {
      let toast = this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      this.backButtonPressed = true;
      //2秒内没有再次点击返回则将触发标志标记为false
      setTimeout(() => {
        this.backButtonPressed = false;
      }, 2000)
    }
  }


  //版本更新
  VersionUpdate(){
    //获取系统最新版本号
    var url = this.httpService.url+"/UpdatePage/checkNum?versionNum="+this.httpService.curreentversion;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      if(data['resultCode']==1){
        if(this.nativeService.isAndroid()){
          //this.iab.create(data['URL'],"_system","location=yes,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭")
          //操作确认提示
          let alert = this.alertCtrl.create({
            title: '发现新版本',
            subTitle:data['entdesc'],
            enableBackdropDismiss:false,
            buttons: [
              {
                text: '立刻升级',
                handler: () => {
                  this.iab.create(data['URL'],"_system","location=yes,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭")
                }
              }
            ]
          });
          alert.present();
        }else if(this.nativeService.isIos()){
          //this.iab.create(data['URL'],"_system","location=yes,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭")
          //操作确认提示
          let alert = this.alertCtrl.create({
           title: '发现新版本',
           subTitle:"请到app Store下载更新",
           enableBackdropDismiss:false,
           buttons: [
           {
             text: '确定',
             handler: () => {
               //正式系统：1317512031
               //培训系统：1313171224
              this.iab.create('https://itunes.apple.com/cn/app/id1313171224?mt=8',"_system","location=yes,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭")
             }
           }
           ]
           });
           alert.present();
        }
      }else {
        this.loginStatus();
      }

    })
  }

  loginStatus(){
    this.storage.get("username").then((res)=>{
      this.storage.get("password").then((result)=>{
        if(res!=undefined&&res!=""&&result!=undefined&&result!=""){
          var url = this.httpService.url+"/appUser/login";
          var body = "username="+res+"&password="+result;
          this.httpService.post(url,body).subscribe((ress)=>{
            let data = ress.json();
            if(data.resultCode==1){
              this.rootPage=TabsPage
            }else {
              this.nativeService.showAlert("登录提示",data['message'])
            }
          })

        }else {
          this.rootPage = LoginPage
        }
      })

    })
  }

}
