import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SampleSignaturepadPage } from './sample-signaturepad';
import {SignaturePadModule} from "angular2-signaturepad";

@NgModule({
  declarations: [
    SampleSignaturepadPage,
  ],
  imports: [
    SignaturePadModule,
    IonicPageModule.forChild(SampleSignaturepadPage),
  ],
})
export class SampleSignaturepadPageModule {}
