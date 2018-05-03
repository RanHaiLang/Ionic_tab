import {ViewerPic} from "./viewer-pic";
import {IonicPageModule} from "ionic-angular";
import {NgModule} from "@angular/core";
/**
 * Created by SeaRan on 2017/8/7.
 */
@NgModule({
  declarations: [
    ViewerPic,
  ],
  imports: [
    IonicPageModule.forChild(ViewerPic),
  ],
  exports: [
    ViewerPic
  ]
})
export class ViewerPicModule {}
