import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {YufangxingweihugongdanListPage} from "../../yufangxingweihugongdan-list";
import {HttpService} from "../../../../prodivers/httpService";

/**
 * Generated class for the ShebeiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shebei',
  templateUrl: 'shebei.html',
})
export class ShebeiPage {

  gongdanDetail:any=[];
  shebeiList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpService) {
    this.gongdanDetail = this.navParams.get("yfxwhDetail");//获取详细信息
    this.getShibeiList();
  }

  getShibeiList(){
    var url = this.httpService.url + "/appEvent/selectevtobj?evt_code="+this.gongdanDetail.evt_code+"&row=10";
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.shebeiList = data['result']
    })
  }

  //下拉刷新
  totalPage:number;//总页数
  doRefresh(refresher){
    this.pageNum = 1;
    var url = this.httpService.url+"/appEvent/selectevtobj?evt_code="+this.gongdanDetail.evt_code+"&row=10";
    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.shebeiList = data['result'];
        this.totalPage = data['pageInf']['totalPage'];
      })
      refresher.complete();
    }, 2000);
  }

  //上拉加载
  pageNum:number=1;
  doInfinite(infiniteScroll){
    if(this.totalPage>this.pageNum){
      this.pageNum += 1;
      var url = this.httpService.url + "/appEvent/selectevtobj?evt_code=" + this.gongdanDetail.evt_code + "&pageNum=" + this.pageNum + "&row=10";
      setTimeout(() => {
        this.httpService.get(url).subscribe((res) => {
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          for (let i = 0; i < data['result'].length; i++) {
            this.shebeiList.push(data['result'][i])
          }
        })
        infiniteScroll.complete();
      }, 2000);
    }else {
      infiniteScroll.complete();
    }
  }

  backPage(){
    this.navCtrl.push(YufangxingweihugongdanListPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShebeiPage');
  }

}
