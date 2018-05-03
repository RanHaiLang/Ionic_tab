import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpService} from "../../prodivers/httpService";

/**
 * Generated class for the LicenseCategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-license-category',
  templateUrl: 'license-category.html',
})
export class LicenseCategoryPage {

  licenseCategory:any=[];
  f:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl:ViewController,public httpService:HttpService) {
    this.getLicenseCategory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LicenseCategoryPage');
  }

  dismiss(y){
    this.viewCtrl.dismiss(y);
  }

  getLicenseCategory(){
    var url = this.httpService.url + "/device/searchswt";
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.licenseCategory = data['result']
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
    var url = this.httpService.url + "/device/searchswt?word="+this.word;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.licenseCategory = data['result'];
      this.totalPage = data['pageInf']['totalPage'];
    })
  }

  //下拉刷新
  doRefresh(refresher){
    this.f = false;
    this.pageNum=1;
    var url = this.httpService.url + "/device/searchswt?word="+this.word;

    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.licenseCategory = data['result'];
        this.totalPage = data['pageInf']['totalPage'];
      })
      refresher.complete();
    }, 2000);
  }

  //上拉加载
  doInfinite(infiniteScroll){
    if(this.totalPage>this.pageNum){
      this.pageNum+=1;
      var url = this.httpService.url + "/device/searchswt?word="+this.word+"&pageNum="+this.pageNum+"&row=10";
      setTimeout(() => {
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          for(let i=0;i<data['result'].length;i++){
            this.licenseCategory.push(data['result'][i])
          }
        })
        infiniteScroll.complete();
      }, 2000);
    }else {
      this.f = true;
      infiniteScroll.complete();
    }
  }

}
