import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPutongweixiuMessagePage } from './add-putongweixiu-message';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [
    AddPutongweixiuMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(AddPutongweixiuMessagePage),
    SharedModule
  ],
})
export class AddPutongweixiuMessagePageModule {}
