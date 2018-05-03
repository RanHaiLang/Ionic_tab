import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongshiDetailPage } from './gongshi-detail';

@NgModule({
  declarations: [
    GongshiDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(GongshiDetailPage),
  ],
})
export class GongshiDetailPageModule {}
