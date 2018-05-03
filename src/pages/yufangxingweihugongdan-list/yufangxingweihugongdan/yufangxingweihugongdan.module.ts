import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YufangxingweihugongdanPage } from './yufangxingweihugongdan';
import {GongdanMessagePageModule} from "./gongdan-message/gongdan-message.module";
import {HuodongPageModule} from "./huodong/huodong.module";
import {GongshidengjiPageModule} from "./gongshidengji/gongshidengji.module";
import {GongyingshanggongshiPageModule} from "./gongyingshanggongshi/gongyingshanggongshi.module";
import {ShebeiPageModule} from "./shebei/shebei.module";

@NgModule({
  declarations: [
    YufangxingweihugongdanPage,
  ],
  imports: [
    IonicPageModule.forChild(YufangxingweihugongdanPage),
    GongdanMessagePageModule,
    HuodongPageModule,
    GongshidengjiPageModule,
    GongyingshanggongshiPageModule,
    ShebeiPageModule
  ],
})
export class YufangxingweihugongdanPageModule {}
