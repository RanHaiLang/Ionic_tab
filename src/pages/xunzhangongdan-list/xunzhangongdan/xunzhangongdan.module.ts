import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { XunzhangongdanPage } from './xunzhangongdan';
import {GongdanMessagePageModule} from "./gongdan-message/gongdan-message.module";
import {YouzhanListPageModule} from "./youzhan-list/youzhan-list.module";

@NgModule({
  declarations: [
    XunzhangongdanPage,
  ],
  imports: [
    IonicPageModule.forChild(XunzhangongdanPage),
    GongdanMessagePageModule,
    YouzhanListPageModule
  ],
})
export class XunzhangongdanPageModule {}
