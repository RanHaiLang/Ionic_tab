import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GaizaogongdanHuodongPage } from './gaizaogongdan-huodong';
import {GaizaogongdanHuodongDetailPageModule} from "./gaizaogongdan-huodong-detail/gaizaogongdan-huodong-detail.module";

@NgModule({
  declarations: [
    GaizaogongdanHuodongPage,
  ],
  imports: [
    IonicPageModule.forChild(GaizaogongdanHuodongPage),
    GaizaogongdanHuodongDetailPageModule
  ],
})
export class GaizaogongdanHuodongPageModule {}
