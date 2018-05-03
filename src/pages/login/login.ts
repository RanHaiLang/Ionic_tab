import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, App} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpService} from "../../prodivers/httpService";
import {NativeService} from "../../prodivers/nativeService";
import {Storage} from "@ionic/storage";
import {UserInfo} from "../../model/UserInfo";
import {HistoryUserPage} from "./history-user";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userForm:any;
  verifyMessages = {
    'username': {
      'errorMsg': '',
      'required': '用户名为必填项',
      'chinese': '姓名必须是中文'
    },
    'password': {
      'errorMsg': '',
      'required': '密码为必填项',
      'minlength':"密码长度最小为6位"
    }
  };
  username:any;
  userInfo:UserInfo;
  userList:any=[];
  newuserList:any=[];
  userArray:any=[];
  b:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,
              public httpService:HttpService,public nativeService:NativeService,private storage: Storage,
              public modalCtrl: ModalController,public app:App) {
    this.userForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })

    this.userForm.valueChanges
      .subscribe(data => {
        const verifyMessages = this.verifyMessages;
        for (const index in verifyMessages) {
          verifyMessages[index].errorMsg = '';
          const control = this.userForm.get(index);
          if (control && control.dirty && !control.valid) {
            const messages = verifyMessages[index];
            for (const key in control.errors) {
              messages[key] && (verifyMessages[index].errorMsg += messages[key] + ' ');
            }
          }
        }
      });
  }

  loginClick(){
    if(this.userForm.value.username==""){
      this.nativeService.showToast("请输入用户名")
    }else if (this.userForm.value.password==""){
      this.nativeService.showToast("请输入密码")
    }else {
      console.log(this.userForm.value.username.toUpperCase())
      var url = this.httpService.url+"/appUser/login";//Md5.hashStr(this.userForm.value.password)
      var body = "username="+this.userForm.value.username.toUpperCase()+"&password="+this.userForm.value.password;
      this.httpService.post(url,body).subscribe(
        data=>{
          let body = data.json();
          console.log(body)
          if(body.resultCode==1){
            this.username = this.userForm.value.username.toUpperCase();

            //获取登录过的用户名
            this.storage.get('userList').then((val) => {
              this.userList = val||[];
              if(this.userList.length>0){
                for(var i=0;i<this.userList.length;i++){
                  if(this.userList[i]==this.username){//已存在用户
                    this.userList.splice(i,1);//删除已存在用户
                    this.newuserList.push(this.username);//存入空数组中，在第一个位置
                    for(var j=0;j<this.userList.length;j++){
                      this.newuserList.push(this.userList[j]);//将原数组中的值存入新数组中
                    }
                    this.userList = this.newuserList;
                    this.b = false;
                  }
                }
                if(this.b==true){//新用户登录
                  this.newuserList.push(this.username);
                  for(i=0;i<this.userList.length;i++){
                    this.newuserList.push(this.userList[i]);
                  }
                  this.userList = this.newuserList;
                }
                this.storage.set("userList",this.userList);
              }else {
                this.userList.push(this.username);
                this.storage.set("userList",this.userList);
              }
            });

            //this.navCtrl.push(TabsPage);
            this.storage.set("username",this.username);
            this.storage.set("password",this.userForm.value.password);
            this.storage.set("mrc",body.mrc);//存储部门编号
            this.storage.set("mrcdesc",body.mrcdesc);//存储部门
            this.storage.set("org",body.org);//用户组织
            this.setAlias(this.username);//设置别名
            this.app.getRootNav().setRoot(TabsPage);
          }else {
            this.nativeService.showAlert("登录提示",body['message'])
          }
        }
      )
    }
  }
  //获取本地记住的用户名
  getuserList(){
    //获取登录过的用户名
    this.storage.get('userList').then((val) => {
      this.userList = val||[];
      let modal = this.modalCtrl.create(HistoryUserPage,{
        userList:this.userList
      });
      modal.onDidDismiss(data => {
        if(data!=""){
          this.userForm = this.formBuilder.group({
            username:[data,[Validators.required]],
            password:['',[Validators.required,Validators.minLength(6)]]
          })
        }
      })
      modal.present();
    })
  }

  //设置别名,一个用户只有一个别名
  public setAlias(userId) {
    if (!this.nativeService.isMobile()) {
      return;
    }
    console.log('设置setAlias:' + userId);
    //ios设置setAlias有bug,值必须为string类型,不能是number类型
    window['plugins'].jPushPlugin.setAlias({ sequence: 1, alias: ''+userId });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

