import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {BeijianlingyongListPage} from "../../beijianlingyong-list";

/**
 * Generated class for the LingyongdanMessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lingyongdan-message',
  templateUrl: 'lingyongdan-message.html',
})
export class LingyongdanMessagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController) {

  }

  backPage(){
    this.navCtrl.push(BeijianlingyongListPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LingyongdanMessagePage');
  }

}
