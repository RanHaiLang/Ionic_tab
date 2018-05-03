import { NgModule } from '@angular/core';
import {IonicPageModule, IonicModule} from 'ionic-angular';
import { WeibaogongdanPage } from './weibaogongdan';
import {GongdanMessageModule} from "./gongdan_Message/gongdan_Message.module";
import {SharedModule} from "../../shared/shared.module";
import {GongzuoJiluModule} from "./gongzuojilu/gongzuojilu.module";
import {GongshidengjiPageModule} from "./gongshidengji/gongshidengji.module";
import {BeijianbaoPageModule} from "./beijianbao/beijianbao.module";
import {WeixiuyongliaoPageModule} from "./weixiuyongliao/weixiuyongliao.module";
import {ShenpiyijianPageModule} from "./shenpiyijian/shenpiyijian.module";
import {RenwubuzhouPageModule} from "./renwubuzhou/renwubuzhou.module";
import {XundianjianxiangPageModule} from "./xundianjianxiang/xundianjianxiang.module";

@NgModule({
  declarations: [
    WeibaogongdanPage
  ],
  imports: [
    IonicPageModule.forChild(WeibaogongdanPage),
    GongdanMessageModule,
    SharedModule,
    GongzuoJiluModule,
    GongshidengjiPageModule,
    BeijianbaoPageModule,
    WeixiuyongliaoPageModule,
    ShenpiyijianPageModule,
    RenwubuzhouPageModule,
    XundianjianxiangPageModule
  ],
  entryComponents: [WeibaogongdanPage],
  providers: [],
  exports: [IonicModule]
})
export class WeibaogongdanPageModule {}
