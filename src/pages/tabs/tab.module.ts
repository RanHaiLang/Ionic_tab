/**
 * Created by SeaRan on 2017/8/3.
 */

import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {TabsPage} from "./tabs";
@NgModule({
  imports: [IonicModule],
  declarations: [TabsPage],
  entryComponents: [TabsPage],
  providers: [],
  exports: [IonicModule]
})

export class TabModule{

}
