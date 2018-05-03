import {IonicPageModule} from "ionic-angular";
import {NgModule} from "@angular/core";
import {GongdanMessage} from "./gongdan_Message";
import {SharedModule} from "../../../shared/shared.module";
/**
 * Created by SeaRan on 2017/8/14.
 */
@NgModule({
  declarations: [
    GongdanMessage
  ],
  imports: [
    IonicPageModule.forChild(GongdanMessage),
    SharedModule
  ],
})
export class GongdanMessageModule {}
