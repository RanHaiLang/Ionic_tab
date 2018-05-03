import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HuodongDetailPage } from './huodong-detail';

@NgModule({
  declarations: [
    HuodongDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HuodongDetailPage),
  ],
})
export class HuodongDetailPageModule {}
