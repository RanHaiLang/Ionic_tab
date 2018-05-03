import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateWorkOrderPage } from './create-work-order';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    CreateWorkOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateWorkOrderPage),
    SharedModule
  ],
})
export class CreateWorkOrderPageModule {}
