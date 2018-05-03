import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { XiangmugaizaogongdanListPage } from './xiangmugaizaogongdan-list';
import {XiangmugaizaoPageModule} from "./xiangmugaizao/xiangmugaizao.module";

@NgModule({
  declarations: [
    XiangmugaizaogongdanListPage,
  ],
  imports: [
    IonicPageModule.forChild(XiangmugaizaogongdanListPage),
    XiangmugaizaoPageModule
  ],
})
export class XiangmugaizaogongdanListPageModule {}
