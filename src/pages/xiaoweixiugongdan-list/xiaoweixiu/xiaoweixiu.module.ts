import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { XiaoweixiuPage } from './xiaoweixiu';
import {XiaoweixiugongdanMessagePageModule} from "./xiaoweixiugongdan-message/xiaoweixiugongdan-message.module";
import {XiaoweixiuGongyingshanggongshiPageModule} from "./xiaoweixiu-gongyingshanggongshi/xiaoweixiu-gongyingshanggongshi.module";

@NgModule({
  declarations: [
    XiaoweixiuPage,
  ],
  imports: [
    IonicPageModule.forChild(XiaoweixiuPage),
    XiaoweixiugongdanMessagePageModule,
    XiaoweixiuGongyingshanggongshiPageModule
  ],
})
export class XiaoweixiuPageModule {}
