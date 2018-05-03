import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongzuoxukezhengPage } from './gongzuoxukezheng';
import {GongzuoxukezhengMessagePageModule} from "./gongzuoxukezheng-message/gongzuoxukezheng-message.module";
import {GongzuoxukezhengXukejianchaxiangPageModule} from "./gongzuoxukezheng-xukejianchaxiang/gongzuoxukezheng-xukejianchaxiang.module";

@NgModule({
  declarations: [
    GongzuoxukezhengPage,
  ],
  imports: [
    IonicPageModule.forChild(GongzuoxukezhengPage),
    GongzuoxukezhengMessagePageModule,
    GongzuoxukezhengXukejianchaxiangPageModule
  ],
})
export class GongzuoxukezhengPageModule {}
