import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GuzhanggongdanListPage} from "../../guzhanggongdan-list";

/**
 * Generated class for the WeixiujiluPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weixiujilu',
  templateUrl: 'weixiujilu.html',
})
export class WeixiujiluPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  backPage(){
    this.navCtrl.push(GuzhanggongdanListPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WeixiujiluPage');
  }

}
