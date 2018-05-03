import {Component} from "@angular/core";
import {IonicPage, MenuController, NavController} from "ionic-angular";
import {FileObj} from "../../../model/FileObj";
import {WeibaogongdanListPage} from "../../weibaogongdan-list/weibaogongdan-list";
/**
 * Created by SeaRan on 2017/8/15.
 */
@IonicPage()
@Component({
  selector: 'page-gongzuojilu',
  templateUrl: 'gongzuojilu.html',
})
export class GongzuoJilu {
  fileObjList: FileObj[] = [];
  constructor(public menuCtrl:MenuController,public navCtrl: NavController){
    menuCtrl.enable(true);
  }

  backPage(){
    this.navCtrl.push(WeibaogongdanListPage)
  }
}
