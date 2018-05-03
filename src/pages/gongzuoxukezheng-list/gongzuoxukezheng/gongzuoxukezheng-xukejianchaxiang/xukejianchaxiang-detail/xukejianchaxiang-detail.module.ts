import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { XukejianchaxiangDetailPage } from './xukejianchaxiang-detail';
import {SharedModule} from "../../../../../shared/shared.module";

@NgModule({
  declarations: [
    XukejianchaxiangDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(XukejianchaxiangDetailPage),
    SharedModule
  ],
})
export class XukejianchaxiangDetailPageModule {}
