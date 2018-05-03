import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {TabModule} from "../pages/tabs/tab.module";
import {HomeModule} from "../pages/home/home.module";
import {ContactModule} from "../pages/contact/contact.module";
import {AboutModule} from "../pages/about/about.module";
import {LoginPageModule} from "../pages/login/login.module";
import {HttpService} from "../prodivers/httpService";
import { HttpModule} from "@angular/http";
import {NativeService} from "../prodivers/nativeService";
import {Network} from "@ionic-native/network";
import {Toast} from "@ionic-native/toast";
import {Camera} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";
import {File} from "@ionic-native/file";
import {SharedModule} from "../shared/shared.module";
import {MenuPageModule} from "../pages/menu/menu.module";
import {WeibaogongdanListPageModule} from "../pages/weibaogongdan-list/weibaogongdan-list.module";
import {BeijianlingyongListPageModule} from "../pages/beijianlingyong-list/beijianlingyong-list.module";
import {WeibaogongdanPageModule} from "../pages/weibaogongdan/weibaogongdan.module";
import {IonicStorageModule} from "@ionic/storage";
import {GuzhanggongdanListPageModule} from "../pages/guzhanggongdan-list/guzhanggongdan-list.module";
import {CreateWorkOrderPageModule} from "../pages/create-work-order/create-work-order.module";
import {FileChooser} from "@ionic-native/file-chooser";
import {MediaCapture} from "@ionic-native/media-capture";
import {VideoPlayer} from "@ionic-native/video-player";
import {YufangxingweihugongdanListPageModule} from "../pages/yufangxingweihugongdan-list/yufangxingweihugongdan-list.module";
import {FileService} from "../prodivers/fileService";
import {FileTransfer} from "@ionic-native/file-transfer";
import {XunzhangongdanListPageModule} from "../pages/xunzhangongdan-list/xunzhangongdan-list.module";
import {XiangmugaizaogongdanListPageModule} from "../pages/xiangmugaizaogongdan-list/xiangmugaizaogongdan-list.module";
import {XiaoweixiugongdanListPageModule} from "../pages/xiaoweixiugongdan-list/xiaoweixiugongdan-list.module";
import {JiuzhengxingweixiugongdanListPageModule} from "../pages/jiuzhengxingweixiugongdan-list/jiuzhengxingweixiugongdan-list.module";
import {GongzuoxukezhengListPageModule} from "../pages/gongzuoxukezheng-list/gongzuoxukezheng-list.module";
import {SampleSignaturepadPageModule} from "../shared/sample-signaturepad/sample-signaturepad.module";
import {DatePicker} from "@ionic-native/date-picker";
import {AboutUsPageModule} from "../pages/about-us/about-us.module";
import {ModifyPasswordPageModule} from "../pages/modify-password/modify-password.module";

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      mode:'ios',
      tabsHideOnSubPages: "true",//跳出模板
      swipeBackEnabled:false
    }),
    IonicStorageModule.forRoot(),
    TabModule,
    HomeModule,
    ContactModule,
    AboutModule,
    LoginPageModule,
    SharedModule,
    MenuPageModule,
    WeibaogongdanListPageModule,
    BeijianlingyongListPageModule,
    WeibaogongdanPageModule,
    GuzhanggongdanListPageModule,
    CreateWorkOrderPageModule,
    YufangxingweihugongdanListPageModule,
    XunzhangongdanListPageModule,
    XiangmugaizaogongdanListPageModule,
    XiaoweixiugongdanListPageModule,
    JiuzhengxingweixiugongdanListPageModule,
    GongzuoxukezhengListPageModule,
    SampleSignaturepadPageModule,
    AboutUsPageModule,
    ModifyPasswordPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    HttpService,
    NativeService,
    FileService,
    Network,
    Toast,
    Camera,
    ImagePicker,
    File,
    FileChooser,
    MediaCapture,
    VideoPlayer,
    FileTransfer,
    DatePicker
  ]
})
export class AppModule {}
