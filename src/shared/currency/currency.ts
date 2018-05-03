import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpService} from "../../prodivers/httpService";
import {NativeService} from "../../prodivers/nativeService";

/**
 * Generated class for the CurrencyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-currency',
  templateUrl: 'currency.html',
})
export class CurrencyPage {

  title:string='';
  udfchar:string='';
  currency:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,
  public httpService:HttpService,public nativeService:NativeService) {
    this.title = this.navParams.get("title");
    this.udfchar = this.navParams.get("udfchar");
    this.getCurrency();
  }
  dismiss(y){
    this.viewCtrl.dismiss(y);
  }

  getCurrency(){
    var url = this.httpService.url +"/device/getgyspjnByPage?udfchar="+this.udfchar;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.currency = data['result'];
    })
  }

  //下拉刷新
  pageNum:number=1;//当前页默认1
  totalPage:number;//总页数
  f:boolean=false;
  doRefresh(refresher){
    this.pageNum=1;
    var url = this.httpService.url + "/device/getgyspjnByPage?udfchar="+this.udfchar;
    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.currency = data['result'];
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
      var url = this.httpService.url + "/device/getgyspjnByPage?udfchar="+this.udfchar+"&pageNum="+this.pageNum+"&row=10";
      setTimeout(() => {
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          for(let i=0;i<data['result'].length;i++){
            this.currency.push(data['result'][i])
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
    console.log('ionViewDidLoad CurrencyPage');
  }

}
