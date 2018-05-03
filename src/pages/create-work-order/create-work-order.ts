import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FileObj} from "../../model/FileObj";

/**
 * Generated class for the CreateWorkOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-work-order',
  templateUrl: 'create-work-order.html',
})
export class CreateWorkOrderPage {

  fileObjList: FileObj[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  backPage(){
    this.navCtrl.popToRoot();
  }
  nextStep(){

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateWorkOrderPage');
  }

}
