import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JiuzhengxingweixiugongdanMessagePage } from './jiuzhengxingweixiugongdan-message';
import {SharedModule} from "../../../../shared/shared.module";
import {CurrencyPage} from "../../../../shared/currency/currency";
import {PersonInChargePage} from "../../../../shared/person-in-charge/person-in-charge";
import {ClassificationPage} from "../../../../shared/classification/classification";

@NgModule({
  declarations: [
    JiuzhengxingweixiugongdanMessagePage,
    CurrencyPage,
    PersonInChargePage,
    ClassificationPage
  ],
  imports: [
    IonicPageModule.forChild(JiuzhengxingweixiugongdanMessagePage),
    SharedModule
  ],
  entryComponents:[
    JiuzhengxingweixiugongdanMessagePage,
    CurrencyPage,
    PersonInChargePage,
    ClassificationPage
  ]
})
export class JiuzhengxingweixiugongdanMessagePageModule {}
