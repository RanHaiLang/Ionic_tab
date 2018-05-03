import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongdanMessagePage } from './gongdan-message';
import {SharedModule} from "../../../../shared/shared.module";
import {HandwrittenSignature} from "../../../../shared/handwritten-signature/handwritten-signature";
import {SignaturePadModule} from "angular2-signaturepad";
import {SelectuserPage} from "../../../../shared/selectuser/selectuser";
import {SelectHuodongPage} from "../../../../shared/select-huodong/select-huodong";

@NgModule({
  declarations: [
    GongdanMessagePage,
    HandwrittenSignature,
    SelectuserPage,
    SelectHuodongPage
  ],
  imports: [
    IonicPageModule.forChild(GongdanMessagePage),
    SharedModule,
    SignaturePadModule,
  ],
  entryComponents:[
    GongdanMessagePage,
    HandwrittenSignature,
    SelectuserPage,
    SelectHuodongPage
  ]
})
export class GongdanMessagePageModule {}

