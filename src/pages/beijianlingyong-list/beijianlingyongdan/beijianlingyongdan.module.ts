import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeijianlingyongdanPage } from './beijianlingyongdan';
import {LingyongdanMessagePageModule} from "./lingyongdan-message/lingyongdan-message.module";
import {BeijianmingxiPageModule} from "./beijianmingxi/beijianmingxi.module";
import {ShenpiyijianPageModule} from "./shenpiyijian/shenpiyijian.module";

@NgModule({
  declarations: [
    BeijianlingyongdanPage,
  ],
  imports: [
    IonicPageModule.forChild(BeijianlingyongdanPage),
    LingyongdanMessagePageModule,
    ShenpiyijianPageModule,
    BeijianmingxiPageModule
  ],
})
export class BeijianlingyongdanPageModule {}
