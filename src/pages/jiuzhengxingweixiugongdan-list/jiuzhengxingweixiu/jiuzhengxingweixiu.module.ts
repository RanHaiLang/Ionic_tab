import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JiuzhengxingweixiuPage } from './jiuzhengxingweixiu';
import {JiuzhengxingweixiugongdanMessagePageModule} from "./jiuzhengxingweixiugongdan-message/jiuzhengxingweixiugongdan-message.module";
import {JiuzhengxingweixiuhuodongPageModule} from "./jiuzhengxingweixiuhuodong/jiuzhengxingweixiuhuodong.module";
import {JiuzhengxingweixiuGongyingshanggongshiPageModule} from "./jiuzhengxingweixiu-gongyingshanggongshi/jiuzhengxingweixiu-gongyingshanggongshi.module";
import {LicenseListPageModule} from "./license-list/license-list.module";

@NgModule({
  declarations: [
    JiuzhengxingweixiuPage,
  ],
  imports: [
    IonicPageModule.forChild(JiuzhengxingweixiuPage),
    JiuzhengxingweixiugongdanMessagePageModule,
    JiuzhengxingweixiuhuodongPageModule,
    JiuzhengxingweixiuGongyingshanggongshiPageModule,
    LicenseListPageModule
  ],
})
export class JiuzhengxingweixiuPageModule {}
