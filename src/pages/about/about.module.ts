/**
 * Created by SeaRan on 2017/8/3.
 */
import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {AboutPage} from "./about";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  imports: [
    IonicModule,
    SharedModule
  ],
  declarations: [AboutPage],
  entryComponents: [AboutPage],
  providers: [],
  exports: [IonicModule]
})

export class AboutModule{

}
