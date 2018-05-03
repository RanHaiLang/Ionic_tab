import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BeijianlingyongListPage} from "../../beijianlingyong-list";

/**
 * Generated class for the ShenpiyijianPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shenpiyijian',
  templateUrl: 'shenpiyijian.html',
})
export class ShenpiyijianPage {

  shenpijianList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shenpijianList.push(
      {"name":"翟爱文","time":"2017-08-22 15:10","message":"同意进行"},
      {"name":"翟爱文","time":"2017-08-22 15:10","message":"同意进行,请加紧办理，加紧办理，紧办理，办理"})
  }

  backPage(){
    this.navCtrl.push(BeijianlingyongListPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShenpiyijianPage');
  }

}
