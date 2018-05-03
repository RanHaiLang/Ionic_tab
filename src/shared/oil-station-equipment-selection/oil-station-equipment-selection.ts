import {Component} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";
import {HttpService} from "../../prodivers/httpService";
import {Storage} from "@ionic/storage";
@Component({
  selector:'page-oil-station-equipment-selection',
  templateUrl:'oil-station-equipment-selection.html'
})
export class OilStationEquipmentSelection{

  username:string;
  youzhanname:any=[];
  key:string;
  title:string;
  url:string;
  evt_mrc:string;

  f:boolean=false;//用于判断数据是最后一页
  constructor(public navParams: NavParams,public viewCtrl:ViewController,public httpService:HttpService,public storage:Storage){
    this.key = this.navParams.get("key");
    this.title = this.navParams.get("title");
    this.url = this.navParams.get("url");
    this.evt_mrc = this.navParams.get("evt_mrc");
    this.storage.get("username").then((res)=>{
      this.username = res;
      this.getOil()
    })
  }

  getOil(){
    var url="";
    if(this.key == 'oil'){//油站名称
      url = this.httpService.url + "/device/"+this.url+"?username="+this.username+"&word=";
    }else {
      url = this.httpService.url + "/device/"+this.url+"?evt_mrc="+this.evt_mrc+"&word=";
    }
     this.httpService.get(url).subscribe((res)=>{
     let data = res.json();
     this.youzhanname = data['result'];
       this.totalPage = data['pageInf']['totalPage'];
     })
  }

  //搜索
  pageNum:number=1;//当前页默认1
  word:string="";
  getItems(item){
    this.f = false;
    this.pageNum=1;
    if(item.target.value!=undefined){
      this.word=item.target.value;
    }else {
      this.word="";
    }
    var url = "";
    if(this.key == 'oil'){//油站名称
      url = this.httpService.url + "/device/"+this.url+"?username="+this.username+"&word="+this.word;
    }else {
      url = this.httpService.url + "/device/"+this.url+"?evt_mrc="+this.evt_mrc+"&word="+this.word;
    }
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.youzhanname = data['result'];
      this.totalPage = data['pageInf']['totalPage'];
    })
  }

  //下拉刷新
  totalPage:number;//总页数
  doRefresh(refresher){
    this.pageNum=1;
    var url = "";
    if(this.key == 'oil'){//油站名称
      url = this.httpService.url + "/device/"+this.url+"?username="+this.username+"&word="+this.word;
    }else {
      url = this.httpService.url + "/device/"+this.url+"?evt_mrc="+this.evt_mrc+"&word="+this.word;
    }
    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.youzhanname = data['result'];
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
      var url = "";
      if(this.key == 'oil'){//油站名称
        url = this.httpService.url + "/device/"+this.url+"?username="+this.username+"&word="+this.word+"&pageNum="+this.pageNum+"&row=10";
      }else {
        url = this.httpService.url + "/device/"+this.url+"?evt_mrc="+this.evt_mrc+"&word="+this.word+"&pageNum="+this.pageNum+"&row=10";
      }
      setTimeout(() => {
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          for(let i=0;i<data['result'].length;i++){
            this.youzhanname.push(data['result'][i])
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
}
