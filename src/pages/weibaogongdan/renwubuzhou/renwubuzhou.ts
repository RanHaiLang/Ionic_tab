import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WeibaogongdanListPage} from "../../weibaogongdan-list/weibaogongdan-list";

/**
 * Generated class for the RenwubuzhouPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-renwubuzhou',
  templateUrl: 'renwubuzhou.html',
})
export class RenwubuzhouPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  backPage(){
    this.navCtrl.push(WeibaogongdanListPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RenwubuzhouPage');
  }

}
