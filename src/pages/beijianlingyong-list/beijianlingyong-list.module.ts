import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeijianlingyongListPage } from './beijianlingyong-list';
import {BeijianlingyongdanPageModule} from "./beijianlingyongdan/beijianlingyongdan.module";

@NgModule({
  declarations: [
    BeijianlingyongListPage,
  ],
  imports: [
    IonicPageModule.forChild(BeijianlingyongListPage),
    BeijianlingyongdanPageModule
  ],
})
export class BeijianlingyongListPageModule {}
