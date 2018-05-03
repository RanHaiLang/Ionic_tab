import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GaizaogongdanMessagePage } from './gaizaogongdan-message';
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
  declarations: [
    GaizaogongdanMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(GaizaogongdanMessagePage),
    SharedModule
  ],
})
export class GaizaogongdanMessagePageModule {}
