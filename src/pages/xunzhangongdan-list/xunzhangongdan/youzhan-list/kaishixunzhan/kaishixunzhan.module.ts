import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KaishixunzhanPage } from './kaishixunzhan';
import {SharedModule} from "../../../../../shared/shared.module";

@NgModule({
  declarations: [
    KaishixunzhanPage,
  ],
  imports: [
    IonicPageModule.forChild(KaishixunzhanPage),
    SharedModule
  ],
})
export class KaishixunzhanPageModule {}
