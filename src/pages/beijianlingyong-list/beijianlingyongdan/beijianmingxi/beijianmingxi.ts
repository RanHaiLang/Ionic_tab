import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BeijianlingyongListPage} from "../../beijianlingyong-list";

/**
 * Generated class for the BeijianmingxiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beijianmingxi',
  templateUrl: 'beijianmingxi.html',
})
export class BeijianmingxiPage {
  beijianmingxiList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.beijianmingxiList.push(
      {"code":"123456","name":"球阀","version":"DH40","guige":"DH40","znumber":"2","knumber":"8"},
      {"code":"123456","name":"球阀","version":"DH40","guige":"DH40","znumber":"2","knumber":"8"},
      {"code":"123456","name":"球阀","version":"DH40","guige":"DH40","znumber":"2","knumber":"8"})
  }

  backPage(){
    this.navCtrl.push(BeijianlingyongListPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BeijianmingxiPage');
  }

}
