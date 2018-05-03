import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongshidengjiPage } from './gongshidengji';
import {AddGongshidengjiPageModule} from "./add-gongshidengji/add-gongshidengji.module";

@NgModule({
  declarations: [
    GongshidengjiPage,
  ],
  imports: [
    IonicPageModule.forChild(GongshidengjiPage),
    AddGongshidengjiPageModule
  ],
})
export class GongshidengjiPageModule {}
