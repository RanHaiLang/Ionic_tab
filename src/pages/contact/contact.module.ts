import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {ContactPage} from "./contact";
/**
 * Created by SeaRan on 2017/8/3.
 */

@NgModule({
  imports: [IonicModule],
  declarations: [ContactPage],
  entryComponents: [ContactPage],
  providers: [],
  exports: [IonicModule]
})

export class ContactModule{

}
