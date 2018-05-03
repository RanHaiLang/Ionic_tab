import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YouzhanListPage } from './youzhan-list';
import {XunzhanjianchaPageModule} from "./xunzhanjiancha/xunzhanjiancha.module";
import {KaishixunzhanPageModule} from "./kaishixunzhan/kaishixunzhan.module";

@NgModule({
  declarations: [
    YouzhanListPage,
  ],
  imports: [
    IonicPageModule.forChild(YouzhanListPage),
    XunzhanjianchaPageModule,
    KaishixunzhanPageModule
  ],
})
export class YouzhanListPageModule {}
