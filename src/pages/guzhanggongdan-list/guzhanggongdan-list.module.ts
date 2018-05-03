import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuzhanggongdanListPage } from './guzhanggongdan-list';
import {GuzhanggongdanPageModule} from "./guzhanggongdan/guzhanggongdan.module";

@NgModule({
  declarations: [
    GuzhanggongdanListPage,
  ],
  imports: [
    IonicPageModule.forChild(GuzhanggongdanListPage),
    GuzhanggongdanPageModule
  ],
})
export class GuzhanggongdanListPageModule {}
