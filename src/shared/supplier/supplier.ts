import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";
import {HttpService} from "../../prodivers/httpService";
import {Storage} from "@ionic/storage";
@Component({
  selector:'page-supplier',
  templateUrl:'supplier.html'
})
export class SupplierPage{

  supplier:any=[];
  username:string;
  f:boolean=false;
  constructor(public viewCtrl:ViewController,public httpService:HttpService,public storage:Storage){
    this.storage.get("username").then((res)=>{
      this.username = res;
      this.getSupplierList();
    })
  }

  getSupplierList(){
    var url = this.httpService.url + "/device/searchsup?username="+this.username;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.supplier = data['result'];
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
    var url = this.httpService.url + "/device/searchsup?username="+this.username+"&word="+this.word;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.supplier = data['result'];
      this.totalPage = data['pageInf']['totalPage'];
    })
  }

  //下拉刷新
  doRefresh(refresher){
    this.pageNum=1;
    var url = this.httpService.url + "/device/searchsup?username="+this.username+"&word="+this.word;
    setTimeout(() => {
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.supplier = data['result'];
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
      var url = this.httpService.url + "/device/searchsup?username="+this.username+"&word="+this.word+"&pageNum="+this.pageNum+"&row=10";
      setTimeout(() => {
        this.httpService.get(url).subscribe((res)=>{
          let data = res.json();
          this.totalPage = data['pageInf']['totalPage'];
          for(let i=0;i<data['result'].length;i++){
            this.supplier.push(data['result'][i])
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
