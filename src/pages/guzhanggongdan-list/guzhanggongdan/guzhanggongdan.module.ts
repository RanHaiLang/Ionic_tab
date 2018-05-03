import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuzhanggongdanPage } from './guzhanggongdan';
import {GongdanMessagePageModule} from "./gongdan-message/gongdan-message.module";
import {SharedModule} from "../../../shared/shared.module";
import {WeixiujiluPageModule} from "./weixiujilu/weixiujilu.module";
import {GongshidengjiPageModule} from "./gongshidengji/gongshidengji.module";
import {BeijianbaoPageModule} from "./beijianbao/beijianbao.module";
import {WeixiuyongliaoPageModule} from "./weixiuyongliao/weixiuyongliao.module";
import {ShenpiyijianPageModule} from "./shenpiyijian/shenpiyijian.module";

@NgModule({
  declarations: [
    GuzhanggongdanPage,
  ],
  imports: [
    IonicPageModule.forChild(GuzhanggongdanPage),
    GongdanMessagePageModule,
    SharedModule,
    WeixiujiluPageModule,
    GongshidengjiPageModule,
    BeijianbaoPageModule,
    WeixiuyongliaoPageModule,
    ShenpiyijianPageModule
  ],
})
export class GuzhanggongdanPageModule {}
