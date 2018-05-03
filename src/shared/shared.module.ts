import {IonicModule} from "ionic-angular";
import {NgModule} from "@angular/core";
import {SelectPic} from "./pic-viewer-component/select-pic";
import {ViewerPicModule} from "./pic-viewer-component/viewer-pic.module";
/**
 * Created by SeaRan on 2017/8/7.
 */
@NgModule({
  imports: [
    IonicModule,
    ViewerPicModule
],
  declarations: [SelectPic],
  exports: [SelectPic],
  providers: []
})
export class SharedModule {

}
