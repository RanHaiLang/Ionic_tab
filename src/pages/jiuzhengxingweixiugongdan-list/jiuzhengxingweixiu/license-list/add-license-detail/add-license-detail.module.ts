import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLicenseDetailPage } from './add-license-detail';
import {LicensePage} from "../../../../../shared/license/license";

@NgModule({
  declarations: [
    AddLicenseDetailPage,
    LicensePage
  ],
  imports: [
    IonicPageModule.forChild(AddLicenseDetailPage),
  ],
  entryComponents:[
    AddLicenseDetailPage,
    LicensePage
  ]
})
export class AddLicenseDetailPageModule {}
