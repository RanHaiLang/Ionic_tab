import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeijianbaoPage } from './beijianbao';
import {CreateBeijianlingyongdanPageModule} from "./create-beijianlingyongdan/create-beijianlingyongdan.module";

@NgModule({
  declarations: [
    BeijianbaoPage,
  ],
  imports: [
    IonicPageModule.forChild(BeijianbaoPage),
    CreateBeijianlingyongdanPageModule
  ],
})
export class BeijianbaoPageModule {}
