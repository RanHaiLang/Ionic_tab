import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongdanMessagePage } from './gongdan-message';
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
  declarations: [
    GongdanMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(GongdanMessagePage),
    SharedModule
  ],
})
export class GongdanMessagePageModule {}
