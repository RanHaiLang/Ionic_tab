import {Component} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";
import {Storage} from "@ionic/storage";
/**
 * Created by SeaRan on 2017/8/18.
 */
@Component({
  selector:'page-history-user',
  templateUrl:'history-user.html'
})
export class HistoryUserPage{

  userList:any=[];
  constructor(private viewCtrl: ViewController,public navparams:NavParams,public storage:Storage){
    this.userList = this.navparams.get("userList");
    console.log("history:"+this.userList)
  }

  dismiss(){
    this.viewCtrl.dismiss("");
  }

  itmeClick(u){
    this.viewCtrl.dismiss(u)
  }
  deleteUser(u){
    for(var i = 0;i<this.userList.length;i++){
      if(this.userList[i]==u){
        this.userList.splice(i,1);
        this.storage.set("userList",this.userList);
      }
    }
  }
}
