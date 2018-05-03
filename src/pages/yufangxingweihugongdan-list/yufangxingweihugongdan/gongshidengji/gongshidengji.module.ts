import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongshidengjiPage } from './gongshidengji';
import {GongshiDetailPageModule} from "./gongshi-detail/gongshi-detail.module";

@NgModule({
  declarations: [
    GongshidengjiPage,
  ],
  imports: [
    IonicPageModule.forChild(GongshidengjiPage),
    GongshiDetailPageModule
  ],
})
export class GongshidengjiPageModule {}
