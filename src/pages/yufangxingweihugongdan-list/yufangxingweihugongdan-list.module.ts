import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YufangxingweihugongdanListPage } from './yufangxingweihugongdan-list';
import {YufangxingweihugongdanPageModule} from "./yufangxingweihugongdan/yufangxingweihugongdan.module";

@NgModule({
  declarations: [
    YufangxingweihugongdanListPage,
  ],
  imports: [
    IonicPageModule.forChild(YufangxingweihugongdanListPage),
    YufangxingweihugongdanPageModule
  ],
})
export class YufangxingweihugongdanListPageModule {}
