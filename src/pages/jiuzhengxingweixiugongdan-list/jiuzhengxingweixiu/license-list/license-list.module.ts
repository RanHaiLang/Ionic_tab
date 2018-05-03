import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LicenseListPage } from './license-list';
import {LicenseDetailPageModule} from "./license-detail/license-detail.module";
import {AddLicenseDetailPageModule} from "./add-license-detail/add-license-detail.module";

@NgModule({
  declarations: [
    LicenseListPage,
  ],
  imports: [
    IonicPageModule.forChild(LicenseListPage),
    LicenseDetailPageModule,
    AddLicenseDetailPageModule
  ],
})
export class LicenseListPageModule {}
