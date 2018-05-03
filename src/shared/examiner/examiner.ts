import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpService} from "../../prodivers/httpService";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ExaminerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-examiner',
  templateUrl: 'examiner.html',
})
export class ExaminerPage {

  examiner:any=[];
  f:boolean=false;
  Org:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl:ViewController,public httpService:HttpService,
              public storage:Storage) {
    this.storage.get("org").then((res)=>{
      this.Org = res;
      this.getlicense();
    })
  }

  dismiss(y){
    this.viewCtrl.dismiss(y);
  }

  //搜索
  pageNum:number=1;//当前页默认1
  totalPage:number;//总页数
  word:string="";
  getlicense(){
    var url = this.httpService.url + "/device/xukzjcrByPage?org="+this.Org;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.examiner = data['result']
      this.totalPage = data['pageInf']['totalPage'];
    })
  }

  getItems(item){
    this.f = false;
    this.pageNum=1;
    if(item.target.value!=undefined){
      this.word=item.target.value;
    }else {
      this.word="";
    }
    var url = this.httpService.url + "/device/xukzjcrByPage?org="+this.Org+"&word="+this.word;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.examiner = data['result'];
      this.totalPage = data['pageInf']['totalPage'];
    })
  }

  //下拉刷新
  doRefresh(refresher){
    this.f = false;
    this.pageNum=1;
    var url = this.httpService.url + "/device/xukzjcrByPage?org="+this.Org+"&word="+this.word;

    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.examiner = data['result'];
        this.totalPage = data['pageInf']['totalPage'];
      })
      refresher.complete();
    }, 2000);
  }

  //上拉加载
  doInfinite(infiniteScroll){
    if(this.totalPage>this.pageNum){
      this.pageNum+=1;
      var url = this.httpService.url + "/device/xukzjcrByPage?org="+this.Org+"&word="+this.word+"&pageNum="+this.pageNum+"&row=10";
      setTimeout(() => {
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          for(let i=0;i<data['result'].length;i++){
            this.examiner.push(data['result'][i])
          }
        })
        infiniteScroll.complete();
      }, 2000);
    }else {
      this.f = true;
      infiniteScroll.complete();
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExaminerPage');
  }

}
