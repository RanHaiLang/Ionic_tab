import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FileObj} from "../../../../model/FileObj";
import {GuzhanggongdanListPage} from "../../guzhanggongdan-list";

/**
 * Generated class for the GongdanMessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gongdan-message',
  templateUrl: 'gongdan-message.html',
})
export class GongdanMessagePage {
  fileObjList: FileObj[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  backPage(){
    this.navCtrl.push(GuzhanggongdanListPage)
  }

  nextStep(){
    console.log("nextstep")
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GongdanMessagePage');
  }

}
