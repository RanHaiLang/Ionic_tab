import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { XunzhangongdanListPage } from './xunzhangongdan-list';
import {XunzhangongdanPageModule} from "./xunzhangongdan/xunzhangongdan.module";

@NgModule({
  declarations: [
    XunzhangongdanListPage,
  ],
  imports: [
    IonicPageModule.forChild(XunzhangongdanListPage),
    XunzhangongdanPageModule
  ],
})
export class XunzhangongdanListPageModule {}
