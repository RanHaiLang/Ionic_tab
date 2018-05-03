/**
 * Created by SeaRan on 2017/8/3.
 */
import {HomePage} from "./home";
import {IonicModule} from "ionic-angular";
import {NgModule} from "@angular/core";
@NgModule({
  imports: [IonicModule],
  declarations: [HomePage],
  entryComponents: [HomePage],
  providers: [],
  exports: [IonicModule]
})

export class HomeModule{

}
