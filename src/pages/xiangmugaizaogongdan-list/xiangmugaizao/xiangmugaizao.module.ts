import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { XiangmugaizaoPage } from './xiangmugaizao';
import {GaizaogongdanMessagePageModule} from "./gaizaogongdan-message/gaizaogongdan-message.module";
import {GaizaogongdanHuodongPageModule} from "./gaizaogongdan-huodong/gaizaogongdan-huodong.module";
import {GaizaogongdanGongyingshanggongshiPageModule} from "./gaizaogongdan-gongyingshanggongshi/gaizaogongdan-gongyingshanggongshi.module";

@NgModule({
  declarations: [
    XiangmugaizaoPage,
  ],
  imports: [
    IonicPageModule.forChild(XiangmugaizaoPage),
    GaizaogongdanMessagePageModule,
    GaizaogongdanHuodongPageModule,
    GaizaogongdanGongyingshanggongshiPageModule
  ],
})
export class XiangmugaizaoPageModule {}
