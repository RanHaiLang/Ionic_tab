import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongzuoxukezhengXukejianchaxiangPage } from './gongzuoxukezheng-xukejianchaxiang';
import {XukejianchaxiangDetailPageModule} from "./xukejianchaxiang-detail/xukejianchaxiang-detail.module";

@NgModule({
  declarations: [
    GongzuoxukezhengXukejianchaxiangPage,
  ],
  imports: [
    IonicPageModule.forChild(GongzuoxukezhengXukejianchaxiangPage),
    XukejianchaxiangDetailPageModule
  ],
})
export class GongzuoxukezhengXukejianchaxiangPageModule {}
