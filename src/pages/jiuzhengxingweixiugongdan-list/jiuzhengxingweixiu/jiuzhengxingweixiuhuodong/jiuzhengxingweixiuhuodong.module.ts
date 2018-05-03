import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JiuzhengxingweixiuhuodongPage } from './jiuzhengxingweixiuhuodong';
import {JiuzhengxingweixiuHuodongDetailPageModule} from "./jiuzhengxingweixiu-huodong-detail/jiuzhengxingweixiu-huodong-detail.module";

@NgModule({
  declarations: [
    JiuzhengxingweixiuhuodongPage,
  ],
  imports: [
    IonicPageModule.forChild(JiuzhengxingweixiuhuodongPage),
    JiuzhengxingweixiuHuodongDetailPageModule
  ],
})
export class JiuzhengxingweixiuhuodongPageModule {}
