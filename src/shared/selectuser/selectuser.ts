import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpService} from "../../prodivers/httpService";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the SelectuserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-selectuser',
  templateUrl: 'selectuser.html',
})
export class SelectuserPage {

  userList:any=[];
  evt_code:string;
  f:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpService:HttpService,public storage:Storage,
              public viewCtrl:ViewController) {
    this.evt_code = this.navParams.get("evt_code");
    console.log(this.evt_code)
    this.getUser();
  }

  getUser(){
    var url = this.httpService.url + "/device/selectuser?evt_code="+this.evt_code;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.userList = data['result']
      this.totalPage = data['pageInf']['totalPage'];
    })
  }

  //搜索
  pageNum:number=1;//当前页默认1
  totalPage:number;//总页数
  word:string="";
  getItems(item){
    this.f = false;
    this.pageNum=1;
    if(item.target.value!=undefined){
      this.word=item.target.value;
    }else {
      this.word="";
    }
    var url = this.httpService.url + "/device/selectuser?evt_code="+this.evt_code+"&word="+this.word;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.userList = data['result'];
      this.totalPage = data['pageInf']['totalPage'];
    })
  }

  //下拉刷新
  doRefresh(refresher){
    this.pageNum=1;
    var url = this.httpService.url + "/device/selectuser?evt_code="+this.evt_code+"&word="+this.word;
    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.userList = data['result'];
        this.totalPage = data['pageInf']['totalPage'];
      })
      this.f = false;
      refresher.complete();
    }, 2000);
  }

  //上拉加载
  doInfinite(infiniteScroll){
    if(this.totalPage>this.pageNum){
      this.pageNum+=1;
      var url = this.httpService.url + "/device/selectuser?evt_code="+this.evt_code+"&word="+this.word+"&pageNum="+this.pageNum+"&row=10";
      setTimeout(() => {
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          for(let i=0;i<data['result'].length;i++){
            this.userList.push(data['result'][i])
          }
        })
        infiniteScroll.complete();
      }, 2000);
    }else {
      this.f = true;
      infiniteScroll.complete();
    }
  }

  dismiss(y){
    this.viewCtrl.dismiss(y);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectuserPage');
  }

}
