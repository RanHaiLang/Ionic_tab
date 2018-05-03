import {IonicPage, MenuController, NavController, Nav} from "ionic-angular";
import {Component, ViewChild} from "@angular/core";
import {WeibaogongdanListPage} from "../../weibaogongdan-list/weibaogongdan-list";
import {FileObj} from "../../../model/FileObj";
/**
 * Created by SeaRan on 2017/8/14.
 */
@IonicPage()
@Component({
  selector: 'page-gongdanmessage',
  templateUrl: 'gongdan_message.html',
})
export class GongdanMessage {
  @ViewChild(Nav) nav: Nav;
  fileObjList: FileObj[] = [];
  constructor(public menuCtrl:MenuController,public navCtrl: NavController){

  }

  backPage(){
    this.navCtrl.push(WeibaogongdanListPage);
  }
}
