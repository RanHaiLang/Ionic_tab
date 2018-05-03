import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddXioweixiuMessagePage } from './add-xioweixiu-message';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [
    AddXioweixiuMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(AddXioweixiuMessagePage),
    SharedModule
  ],
})
export class AddXioweixiuMessagePageModule {}
