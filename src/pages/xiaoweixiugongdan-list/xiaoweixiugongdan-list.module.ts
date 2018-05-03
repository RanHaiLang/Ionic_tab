import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { XiaoweixiugongdanListPage } from './xiaoweixiugongdan-list';
import {XiaoweixiuPageModule} from "./xiaoweixiu/xiaoweixiu.module";
import {AddXioweixiuMessagePageModule} from "./add-xioweixiu-message/add-xioweixiu-message.module";

@NgModule({
  declarations: [
    XiaoweixiugongdanListPage,
  ],
  imports: [
    IonicPageModule.forChild(XiaoweixiugongdanListPage),
    XiaoweixiuPageModule,
    AddXioweixiuMessagePageModule
  ],
})
export class XiaoweixiugongdanListPageModule {}
