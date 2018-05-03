import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {JiuzhengxingweixiugongdanListPage} from "../../jiuzhengxingweixiugongdan-list";
import {HttpService} from "../../../../prodivers/httpService";
import {LicenseDetailPage} from "./license-detail/license-detail";
import {AddLicenseDetailPage} from "./add-license-detail/add-license-detail";

/**
 * Generated class for the LicenseListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-license-list',
  templateUrl: 'license-list.html',
})
export class LicenseListPage {

  licenseList:any=[];
  jzxwxDetail:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpService) {
    if(this.navParams.get("key")=='detail'){
      this.jzxwxDetail.evt_code = this.navParams.get("evt_code")
      this.jzxwxDetail.evt_rstatus = this.navParams.get("evt_rstatus")
    }else {
      this.jzxwxDetail = this.navParams.get("jzxwxDetail");
    }
    this.getLicenseList();
  }

  backPage(){
    this.navCtrl.push(JiuzhengxingweixiugongdanListPage)
  }

  getLicenseList(){
    var url = this.httpService.url+"/appEvent/pevevtlist?evt_code="+this.jzxwxDetail.evt_code+"&row=10";
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.licenseList = data['result'];
      this.totalPage = data['pageInf']['totalPage'];
    })
  }

  pageNum:number=1;//当前页默认1
  totalPage:number;//总页数
  //下拉刷新
  doRefresh(refresher){
    this.pageNum=1;
    var url = this.httpService.url+"/appEvent/pevevtlist?evt_code="+this.jzxwxDetail.evt_code+"&row=10";
    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.licenseList = data['result'];
        this.totalPage = data['pageInf']['totalPage'];
      })
      refresher.complete();
    }, 2000);
  }

  //上拉加载
  doInfinite(infiniteScroll){
    if(this.totalPage>this.pageNum){
      this.pageNum+=1;
      var url = this.httpService.url + "/appEvent/pevevtlist?evt_code="+this.jzxwxDetail.evt_code+"&pageNum="+this.pageNum+"&row=10";
      setTimeout(() => {
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          for(let i=0;i<data['result'].length;i++){
            this.licenseList.push(data['result'][i])
          }
        })
        infiniteScroll.complete();
      }, 2000);
    }else {
      infiniteScroll.enable(false);
    }
  }

  LicenseDetail(l){
    this.navCtrl.push(LicenseDetailPage,{
      licenseDetail:l,
      evt_code:this.jzxwxDetail.evt_code,
      evt_rstatus:this.jzxwxDetail.evt_rstatus
    })
  }
  newLicense(){
    this.navCtrl.push(AddLicenseDetailPage,{
      evt_code:this.jzxwxDetail.evt_code,
      evt_rstatus:this.jzxwxDetail.evt_rstatus
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LicenseListPage');
  }

}
