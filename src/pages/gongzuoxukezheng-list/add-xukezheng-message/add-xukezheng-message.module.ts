import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddXukezhengMessagePage } from './add-xukezheng-message';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [
    AddXukezhengMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(AddXukezhengMessagePage),
    SharedModule
  ],
})
export class AddXukezhengMessagePageModule {}
