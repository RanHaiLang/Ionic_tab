import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JiuzhengxingweixiugongdanListPage } from './jiuzhengxingweixiugongdan-list';
import {JiuzhengxingweixiuPageModule} from "./jiuzhengxingweixiu/jiuzhengxingweixiu.module";
import {AddPutongweixiuMessagePageModule} from "./add-putongweixiu-message/add-putongweixiu-message.module";

@NgModule({
  declarations: [
    JiuzhengxingweixiugongdanListPage,
  ],
  imports: [
    IonicPageModule.forChild(JiuzhengxingweixiugongdanListPage),
    JiuzhengxingweixiuPageModule,
    AddPutongweixiuMessagePageModule
  ],
})
export class JiuzhengxingweixiugongdanListPageModule {}
