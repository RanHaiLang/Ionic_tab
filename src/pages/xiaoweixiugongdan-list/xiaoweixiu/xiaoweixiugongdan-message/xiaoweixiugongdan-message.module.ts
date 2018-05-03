import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { XiaoweixiugongdanMessagePage } from './xiaoweixiugongdan-message';
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
  declarations: [
    XiaoweixiugongdanMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(XiaoweixiugongdanMessagePage),
    SharedModule
  ],
})
export class XiaoweixiugongdanMessagePageModule {}
