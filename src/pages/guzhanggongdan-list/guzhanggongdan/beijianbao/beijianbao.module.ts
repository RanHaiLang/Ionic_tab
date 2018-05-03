import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeijianbaoPage } from './beijianbao';
import {CreateBeijianlingyongdanPageModule} from "./create-beijianlingyongdan/create-beijianlingyongdan.module";
import {CreateWuzijihuaPageModule} from "./create-wuzijihua/create-wuzijihua.module";

@NgModule({
  declarations: [
    BeijianbaoPage,
  ],
  imports: [
    IonicPageModule.forChild(BeijianbaoPage),
    CreateBeijianlingyongdanPageModule,
    CreateWuzijihuaPageModule
  ],
})
export class BeijianbaoPageModule {}
