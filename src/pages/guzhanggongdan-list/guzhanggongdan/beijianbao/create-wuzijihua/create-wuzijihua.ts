import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CreateWuzijihuaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-wuzijihua',
  templateUrl: 'create-wuzijihua.html',
})
export class CreateWuzijihuaPage {
  beijianlingyongList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.beijianlingyongList.push(
      {"code":"123456","name":"球阀","DH40":"","guige":"DH40","znumber":"2","knumber":"8","select":"true"},
      {"code":"123456","name":"球阀","DH40":"","guige":"DH40","znumber":"2","knumber":"8","select":"false"},
      {"code":"123456","name":"球阀","DH40":"","guige":"DH40","znumber":"2","knumber":"8","select":"true"})
  }

  backPage(){
    this.navCtrl.popToRoot()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateWuzijihuaPage');
  }

}
