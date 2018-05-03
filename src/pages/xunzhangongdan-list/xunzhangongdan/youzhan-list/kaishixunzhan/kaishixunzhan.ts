import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {YouzhanListPage} from "../youzhan-list";
import {HttpService} from "../../../../../prodivers/httpService";
import {FileObj} from "../../../../../model/FileObj";
import {NativeService} from "../../../../../prodivers/nativeService";
import {FileService} from "../../../../../prodivers/fileService";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the KaishixunzhanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kaishixunzhan',
  templateUrl: 'kaishixunzhan.html',
})
export class KaishixunzhanPage {

  title:string;//标题
  index:number;//当前页
  finished:number;//完成项数
  xunzhanjiancha:any=[];//问题
  xunzhanxuanxiang:any=[];//选项
  evt_code:string;//工单号
  evt_rstatus:string;//工单状态
  evt_code2:string;//油站工单号
  totalNumber:number;//总条数
  danxuan:string="";
  answer:any=[];//改变后的答案
  answers:any=[];//已有答案
  problemdesc:any=[];//问题描述
  ImageDate:any=[];//

  fileObjList: FileObj[] = [];
  filePaths: FileObj[] = [];
  username:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpService,
              public nativeService:NativeService,public fileService:FileService,public storage:Storage) {
    this.title = this.navParams.get("title");
    this.evt_code = this.navParams.get("evt_code");
    this.evt_rstatus = this.navParams.get("evt_rstatus");
    this.evt_code2 = this.navParams.get("evt_code2");
    this.index = parseInt(this.navParams.get("index"));
    this.finished = parseInt(this.navParams.get("finished"));

    this.storage.set("rcv_event",this.evt_code2);//存储油站工单号，用于图片上传
    this.storage.set("ImgUploadUrl",'evtuploadwd');
    this.storage.set("ImgUrl",'evtxkzjcbycode');//获取检查项图片信息的路径
    this.storage.set("pageNum",this.index);

    this.storage.get("username").then((res)=>{
      this.username = res;
    })
    this.getxzwdList();
  }

  backPage(){
    this.navCtrl.pop()
  }
  ionViewWillEnter(){

  }

  //获取问答、选项
  getxzwdList(){
    this.filePaths=[];
    this.answer=[];
    var url = this.httpService.url + "/appEvent/evtxkzjcbycode?evt_code="+this.evt_code+"&evt_code2="+this.evt_code2+"&pageNum="+this.index;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.xunzhanjiancha = data['result'][0];
      this.xunzhanjiancha.rcv_udfchar10==null?"":this.xunzhanjiancha.rcv_udfchar10;

      this.storage.set("rcv_act",this.xunzhanjiancha.act_act);//活动编号用于图片上传
      console.log("rcv_act:"+this.xunzhanjiancha.act_act)

      this.danxuan = this.xunzhanjiancha.rcv_value==null?"":this.xunzhanjiancha.rcv_value.trim();
      this.totalNumber = data['pageInf'].totalNumber;
      this.xunzhanxuanxiang = data['taskChecklistses'];
      this.problemdesc = data['adDetail'];
      this.ImageDate = data['r5rmDocs'];
      //给图片的数组赋值
      for(var i=0;i<this.ImageDate.length;i++){
        var suffix = this.ImageDate[i].rcd_doc.substring(this.ImageDate[i].rcd_doc.lastIndexOf(".")+1);
        let fileObj = <FileObj>{'id':this.ImageDate[i].rcd_id,'origPath': this.ImageDate[i].rcd_doc,
                                'thumbPath': this.ImageDate[i].rcd_doc, 'suffix':suffix};
        this.filePaths.push(fileObj);
      }

      if(this.danxuan!=""&&this.xunzhanjiancha.tsk_class=='XX-MS'){
        this.answers = this.danxuan.split(";")//获取答案转换为数组
        for(let i=0;i<this.answers.length;i++){
          for(let j =0;j<this.xunzhanxuanxiang.length;j++){
            if(this.answers[i]==this.xunzhanxuanxiang[j]['tch_desc']){//如果答案与选项相同，则重新赋值给answer
              this.answer.push({"tch_desc":this.answers[i],"index":j})
              this.xunzhanxuanxiang[j].tch_code =true;//将tch_code值改变为true用于判断是否选中
            }
          }
        }
      }
      if(this.danxuan!=""&&this.xunzhanjiancha.tsk_class=='XX-QA'){
        this.wenda = this.danxuan.split(";");
        for(let i=0;i<this.xunzhanxuanxiang.length;i++){
          this.xunzhanxuanxiang[i].tch_sequence = this.wenda[i]
          this.newwenda.push({'index':i,'rcv_value':this.wenda[i]})
        }
        console.log(this.wenda)
        this.rcv_value = this.danxuan;
      }
      if(this.danxuan==""&&this.xunzhanjiancha.tsk_class=='XX-QA'){
        for(let i=0;i<this.xunzhanxuanxiang.length;i++){
          this.xunzhanxuanxiang[i].tch_sequence = "";
        }
      }
    })
  }


  danxuans(){
    this.rcv_value = this.danxuan;
    console.log("rcv:"+this.rcv_value)
  }

  newwenda:any=[];
  wenda:any=[];
  wendas(i,event){
    console.log("i="+i)
    console.log(event.value)
    if(this.newwenda.length>0&&this.newwenda.length>i){
      this.newwenda[i].rcv_value = event.value;
    }else {
      this.newwenda.push({'index':i,'rcv_value':event.value})
    }
    console.log(this.newwenda)
  }

  rcv_value:string="";
  b:boolean=true;//定义一个布尔类型的变量用于判断
  duoxuan(tch_desc,index){
    this.b = true;
    if(this.answer.length==0){//如果答案为空直接添加
      this.answer.push({"tch_desc":tch_desc,"index":index})
    }else {
      for(let i =0;i<this.answer.length;i++){
        if(index==this.answer[i]['index']){//循环答案与点击选择的答案索引做一个对比，如果点击的答案是已经存在的，则删除该答案
          this.answer.splice(i,1);
          this.b=false;
        }
      }
      if(this.b==true){//答案数组不为空，且点击的答案不存在于答案数组中则添加
        this.answer.push({"tch_desc":tch_desc,"index":index})
      }
    }
    console.log(this.answer);
  }

  f:boolean=true;
  NextItem(key){
    if(this.xunzhanjiancha.tsk_class=='XX-MS'){
      this.rcv_value="";
      for(let i=0;i<this.answer.length;i++){
        this.rcv_value+=this.answer[i].tch_desc+";"
      }
      this.rcv_value = this.rcv_value.substring(0,this.rcv_value.length-1);
    }
    if(this.xunzhanjiancha.tsk_class=='XX-QA'){
      if(this.newwenda.length>0){
        this.rcv_value="";
        for(let i=0;i<this.newwenda.length;i++){
          this.rcv_value +=this.newwenda[i]['rcv_value']+";"
          if(this.newwenda[i]['rcv_value']==""){
            this.f=false;
          }
        }
        this.rcv_value = this.rcv_value.substring(0,this.rcv_value.length-1);
        console.log(this.rcv_value);
      }
    }
    console.log(this.rcv_value);
    if(this.rcv_value==""||this.f==false){
      this.nativeService.showToast("请填写答案")
      this.f=true;
    }else {
      //保存当前页数据
      if(this.xunzhanjiancha.rcv_udfchar10==null){
        this.xunzhanjiancha.rcv_udfchar10="";
      }
      var url = this.httpService.url + "/appEvent/saveevtxz";
      let body = "rcv_event="+this.evt_code+"&rcv_act="+this.xunzhanjiancha.act_act+"&rcv_tch="+this.xunzhanjiancha.tsk_code
        +"&rcv_value="+this.rcv_value+"&actnote="+this.xunzhanjiancha.rcv_udfchar10+"&evt_udfchar01="+this.totalNumber
        +"&evt_code2="+this.evt_code2+"&rcv_createdby="+this.username;
      console.log(body)
      this.httpService.post(url,body).subscribe((res)=>{
        let data = res.json();
        if(data['resultCode']==1){
          if(key!='submit'){
            this.index = this.index+1;
            this.danxuan = "";
            this.rcv_value = "";
            this.answer=[];
            this.getxzwdList();
          }else {
            //this.rcv_value = "";
          }
        }else {
          this.nativeService.showToast(data['message']);
        }
      })
    }
  }
  PreviousItem(){
    this.index = this.index-1;
    this.answer=[];
    this.answers=[];
    this.rcv_value=""
    this.danxuan=""
    this.newwenda=[];
    this.f=true;
    this.getxzwdList();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad KaishixunzhanPage');
  }

}
