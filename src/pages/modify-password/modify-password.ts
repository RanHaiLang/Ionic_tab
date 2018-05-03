import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder} from "@angular/forms";
import {HttpService} from "../../prodivers/httpService";
import {NativeService} from "../../prodivers/nativeService";
import {Storage} from "@ionic/storage";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ModifyPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-password',
  templateUrl: 'modify-password.html',
})
export class ModifyPasswordPage {

  editForm:any;
  username:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,
  public httpService:HttpService,public nativeService:NativeService,public storage:Storage) {
    this.editForm = this.formBuilder.group({
      oldPassword:["",[Validators.required]],
      newPassword:["",[Validators.required]],
      rePassword:["",[Validators.required]],
    })
    this.storage.get("username").then((res)=>{
      this.username = res;
    })
  }

  backPage(){
    this.navCtrl.pop();
  }

  updatePassword(){
    if(this.editForm.value.oldPassword==null||this.editForm.value.oldPassword==""){
      this.nativeService.showToast("请输入原密码");
    }else {
      if(this.editForm.value.newPassword==null||this.editForm.value.newPassword==""){
        this.nativeService.showToast("请输入新密码");
      } else {
        if(this.editForm.value.rePassword==null||this.editForm.value.rePassword==""){
          this.nativeService.showToast("请输入重复密码");
        }else {
          if(this.editForm.value.newPassword.length<6||this.editForm.value.rePassword.length<6){
            this.nativeService.showToast("密码长度不能少于6位")
          }else {
            if(this.editForm.value.newPassword!=this.editForm.value.rePassword){
              this.nativeService.showToast("两次输入的密码不一致请重新输入")
            }else {
              var url = this.httpService.url +"/appUser/changePass";
              let body = "username="+this.username+"&password="+this.editForm.value.oldPassword+"&newPass="+this.editForm.value.newPassword;
              this.httpService.post(url,body).subscribe((res)=>{
                let data = res.json();
                this.nativeService.showToast(data['message']);
                if(data['resultCode']==1){
                  this.navCtrl.push(LoginPage)
                }
              })
            }
          }

        }
      }
    }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPasswordPage');
  }

}
