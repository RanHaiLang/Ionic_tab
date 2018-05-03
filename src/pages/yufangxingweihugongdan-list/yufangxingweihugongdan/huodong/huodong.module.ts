import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HuodongPage } from './huodong';
import {HuodongDetailPageModule} from "./huodong-detail/huodong-detail.module";

@NgModule({
  declarations: [
    HuodongPage,
  ],
  imports: [
    IonicPageModule.forChild(HuodongPage),
    HuodongDetailPageModule
  ],
})
export class HuodongPageModule {}
