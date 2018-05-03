import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongzuoxukezhengMessagePage } from './gongzuoxukezheng-message';
import {SharedModule} from "../../../../shared/shared.module";
import {OilStationEquipmentSelection} from "../../../../shared/oil-station-equipment-selection/oil-station-equipment-selection";
import {SupplierPage} from "../../../../shared/supplier/supplier";
import {RiskPriorityPage} from "../../../../shared/risk-priority/risk-priority";
import {LicenseCategoryPage} from "../../../../shared/license-category/license-category";
import {DepartmentPage} from "../../../../shared/department/department";
import {JobNumberPage} from "../../../../shared/job-number/job-number";
import {ExaminerPage} from "../../../../shared/examiner/examiner";

@NgModule({
  declarations: [
    GongzuoxukezhengMessagePage,
    OilStationEquipmentSelection,
    SupplierPage,
    RiskPriorityPage,
    LicenseCategoryPage,
    DepartmentPage,
    JobNumberPage,
    ExaminerPage
  ],
  imports: [
    IonicPageModule.forChild(GongzuoxukezhengMessagePage),
    SharedModule
  ],
  entryComponents:[
    GongzuoxukezhengMessagePage,
    OilStationEquipmentSelection,
    SupplierPage,
    RiskPriorityPage,
    LicenseCategoryPage,
    DepartmentPage,
    JobNumberPage,
    ExaminerPage
  ]
})
export class GongzuoxukezhengMessagePageModule {}
