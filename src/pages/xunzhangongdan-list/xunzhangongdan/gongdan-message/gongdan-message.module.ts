import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongdanMessagePage } from './gongdan-message';
import {SharedModule} from "../../../../shared/shared.module";
import {OpinionPage} from "../../../../shared/opinion/opinion";

@NgModule({
  declarations: [
    GongdanMessagePage,
    OpinionPage
  ],
  imports: [
    IonicPageModule.forChild(GongdanMessagePage),
    SharedModule
  ],
  entryComponents:[
    OpinionPage
  ]
})
export class GongdanMessagePageModule {}
