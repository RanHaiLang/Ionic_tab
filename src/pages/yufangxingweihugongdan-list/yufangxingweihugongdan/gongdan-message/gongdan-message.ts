import {Component, ElementRef, ViewChild, Input} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, ActionSheetController} from 'ionic-angular';
import {YufangxingweihugongdanListPage} from "../../yufangxingweihugongdan-list";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpService} from "../../../../prodivers/httpService";
import {NativeService} from "../../../../prodivers/nativeService";
import {FileObj} from "../../../../model/FileObj";
import {FileService} from "../../../../prodivers/fileService";
import {SignaturePad} from "angular2-signaturepad/signature-pad";
import {HandwrittenSignature} from "../../../../shared/handwritten-signature/handwritten-signature";
import {SupplierPage} from "../../../../shared/supplier/supplier";
import {Storage} from "@ionic/storage";
import {OpinionPage} from "../../../../shared/opinion/opinion";
import {YufangxingweihugongdanPage} from "../yufangxingweihugongdan";

/**
 * Generated class for the GongdanMessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gongdan-message',
  templateUrl: 'gongdan-message.html',
})
export class GongdanMessagePage {

  MessageForm:any;
  gongdanDetail:any={};
  //fileObjList: FileObj[] = [];
  filePaths: FileObj[] = [];

  imageData:string;
  yfxOpinion:any=[];
  yfxwhImageDate:any=[];
  username:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder:FormBuilder,public httpService:HttpService,
              public nativeService:NativeService,public fileService:FileService,
              public modalCtrl:ModalController,public storage:Storage,
              private actionSheetCtrl: ActionSheetController) {
    this.gongdanDetail = this.navParams.get("yfxwhDetail");//获取详细信息
    this.storage.set("evt_code",this.gongdanDetail.evt_code);//存储evt_code，用于上传图片
    this.storage.set("ImgUploadUrl",'evtuploadqm');
    this.storage.get("yfxwhImageDate").then((res)=>{
      this.yfxwhImageDate = res;
      for(var i=0;i<this.yfxwhImageDate.length;i++){
        var suffix = this.yfxwhImageDate[i].doc_filename.substring(this.yfxwhImageDate[i].doc_filename.lastIndexOf(".")+1);
        let fileObj = <FileObj>{'id':this.yfxwhImageDate[i].doc_code,'origPath': this.yfxwhImageDate[i].doc_filename, 'thumbPath': this.yfxwhImageDate[i].doc_filename, 'suffix':suffix};
        this.filePaths.push(fileObj);
      }
    })
    this.storage.get("username").then((res)=>{
      this.username = res;
    })
    this.storage.get("yfxOpinion").then((res)=>{
      this.yfxOpinion = res;
    })
    this.MessageForm = this.formBuilder.group({
      evt_code:[this.gongdanDetail.evt_code=null?"":this.gongdanDetail.evt_code,[Validators.required]],
      evt_desc:[this.gongdanDetail.evt_desc=null?"":this.gongdanDetail.evt_desc,[Validators.required]],
      des_text:[this.gongdanDetail.des_text=null?"":this.gongdanDetail.des_text,[Validators.required]],
      uco_desc:[this.gongdanDetail.uco_desc=null?"":this.gongdanDetail.uco_desc,[Validators.required]],
      evt_status:[this.gongdanDetail.evt_status=null?"":this.gongdanDetail.evt_status,[Validators.required]],//状态
      uco_desc2:[this.gongdanDetail.uco_desc2=null?"":this.gongdanDetail.uco_desc2,[Validators.required]],
      com_desc:[this.gongdanDetail.com_desc=null?"":this.gongdanDetail.com_desc,[Validators.required]],//供应商描述
      evt_udfchar30:[this.gongdanDetail.evt_udfchar30=null?"":this.gongdanDetail.evt_udfchar30,[Validators.required]],//供应商代码
      evt_udfnum01:[this.gongdanDetail.evt_udfnum01=null?"":this.gongdanDetail.evt_udfnum01,[Validators.required]],
      evt_target:[this.gongdanDetail.evt_target=null?"":this.gongdanDetail.evt_target,[Validators.required]],
      evt_schedend:[this.gongdanDetail.evt_schedend=null?"":this.gongdanDetail.evt_schedend,[Validators.required]],
      evt_start:[this.gongdanDetail.evt_start=null?"":this.gongdanDetail.evt_start,[Validators.required]],
      evt_completed:[this.gongdanDetail.evt_completed=null?"":this.gongdanDetail.evt_completed,[Validators.required]],
    })
  }

  openTime(key){
    this.nativeService.datePickerss().subscribe(date=>{
      console.log(date);
      if(key=='evt_start'){
        this.MessageForm.controls['evt_start'].setValue(date)
      }else if(key=='evt_completed'){
        this.MessageForm.controls['evt_completed'].setValue(date)
      }
    })
  }
  backPage(){
    this.navCtrl.push(YufangxingweihugongdanListPage)
  }
  getSupplier(){
    let modal = this.modalCtrl.create(SupplierPage,{
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        this.MessageForm.controls['evt_udfchar30'].setValue("")
        this.MessageForm.controls['com_desc'].setValue("")
      }else {
        if(data.com_code!=undefined){
          this.MessageForm.controls['evt_udfchar30'].setValue(data.com_code)
          this.MessageForm.controls['com_desc'].setValue(data.com_desc)
        }

      }
    });
    modal.present();
  }

  //获取下一步状态按钮
  statusButton:any=[];
  nextStatus(){
    this.storage.get("username").then((username)=>{
      var url = this.httpService.url + "/appEvent/evtnexttype?evtstatus="+this.gongdanDetail.evt_status+"&username="+username;
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.statusButton = data['result']
        console.log(this.statusButton)
        for(let i=0;i<this.statusButton.length;i++){
          this.buttons.push({text:this.statusButton[i].autstatnewdesc,handler:()=>{this.submitMessage('updateStatus',this.statusButton[i].aut_statnew)}})
        }
        this.buttons.push({text: '取消',role: 'cancel'})
        if(this.gongdanDetail.evt_rstatus=='C'||this.buttons.length==1){
          this.temp=true
        }
      })
    })
  }

  //审批意见
  temp:boolean=false;
  BeizhuClick(index){
    if(index==1){
      this.temp = true
    }else {
      this.temp = false
    }
  }


  submitMessage(key,aut_status){
    var evt_start = new Date(this.MessageForm.value.evt_start).valueOf();
    var start = new Date().valueOf();//当前时间
    var evt_completed = new Date(this.MessageForm.value.evt_completed).valueOf();
    var evt_created = new Date(this.MessageForm.value.evt_created).valueOf();//工单创建时间
    console.log(evt_start+":"+evt_completed);
    if(evt_created>evt_start&&evt_created!=0&&evt_start!=0){
      this.nativeService.showToast("开始时间必须晚于工单创建时间")
    }else {
      if(evt_start>start&&evt_start!=0){
        this.nativeService.showToast("开始时间必须早于当前是时间")
      }else {
        if(evt_start>evt_completed&&evt_start!=0&&evt_completed!=0){
          this.nativeService.showToast("开始时间必须早于结束时间")
        }else {
          if(this.MessageForm.value.evt_udfnum01==""){
            this.MessageForm.controls['evt_udfnum01'].setValue(0);
          }
          var url = this.httpService.url + "/appEvent/updatetotalevt";
          let body="evt_code="+this.MessageForm.value.evt_code+"&evt_udfchar30="+this.MessageForm.value.evt_udfchar30
                  +"&evt_udfnum01="+this.MessageForm.value.evt_udfnum01+"&evt_updatedby="+this.username;
          if((this.MessageForm.value.evt_start==null||this.MessageForm.value.evt_start=="")
            &&(this.MessageForm.value.evt_completed!=null&&this.MessageForm.value.evt_completed!="")){
             body +="&evt_completed="+this.MessageForm.value.evt_completed;

          }else if((this.MessageForm.value.evt_start!=null&&this.MessageForm.value.evt_start!="")
            &&(this.MessageForm.value.evt_completed==null||this.MessageForm.value.evt_completed=="")){
            body += "&evt_start="+this.MessageForm.value.evt_start
          }else if((this.MessageForm.value.evt_start==null||this.MessageForm.value.evt_start=="")
            &&(this.MessageForm.value.evt_completed==null||this.MessageForm.value.evt_completed=="")){
            body = body;
          }
          else {
            body += "&evt_start="+this.MessageForm.value.evt_start+"&evt_completed="+this.MessageForm.value.evt_completed;
          }

          this.httpService.post(url,body).subscribe((res)=>{
            let data = res.json();
            console.log(data);
            if(data['resultCode']==1){
              if(key=='updateStatus'){//更新状态
                this.updateStatus(aut_status)
              }else {
                this.nativeService.showToast(data['message'])
                this.getDetail(this.MessageForm.value.evt_code)
              }
            }else {
              this.nativeService.showToast(data['message'])
            }
          })
        }
      }
    }
  }

  //获取详情
  getDetail(evt_code){
    //获取详细信息
    var url = this.httpService.url + "/appEvent/evtpmwhdetail?evt_code="+evt_code;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      console.log(data['result'])
      this.storage.set("yfxwhDetail",data['result']);
      this.storage.set("yfxwhImageDate",data['r5rmDocs']);
      this.storage.set("yfxOpinion",data['adDetails']);//存储审批意见
      this.navCtrl.push(YufangxingweihugongdanPage,{
        yfxwhDetail:data['result']
      })
    })
  }

  //状态更新
  updateStatus(aut_status){
    //手写签名
    let modal = this.modalCtrl.create(HandwrittenSignature,{
      evt_code:this.gongdanDetail.evt_code,
      evt_statu:this.gongdanDetail.evt_status
    });
    modal.onDidDismiss(data => {
      if(data==1) {//签名成功
        //填写审批意见
        let modals = this.modalCtrl.create(OpinionPage,{
          evt_code:this.MessageForm.value.evt_code
        });
        modals.onDidDismiss(datas => {
          if(datas==1){
            //更新状态
            var url = this.httpService.url + "/appEvent/updateeventstatus";
            let body = "evt_code="+this.MessageForm.value.evt_code+"&evt_status="+aut_status
                      +"&evt_oldstatus="+this.MessageForm.value.evt_status+"&evt_updatedby="+this.username;
            console.log(body)
            this.httpService.post(url,body).subscribe((res)=>{
              let data = res.json();
              if(data['resultCode']==1){
                this.nativeService.showToast(data['message'])
                //this.navCtrl.push(YufangxingweihugongdanListPage)
                this.getDetail(this.MessageForm.value.evt_code)
              }else {
                this.nativeService.showToast(data['message'])
              }
            })
          }else {
            this.getDetail(this.MessageForm.value.evt_code)
          }
        })
        modals.present();
      }else {
        this.getDetail(this.MessageForm.value.evt_code)
      }
    });
    modal.present();
  }
  ionViewDidLoad() {//当页面加载完毕时触发。它只会在新页面被创建时触发一次，如页面被缓存再一次触发，它不会有任何反应
    console.log('ionViewDidLoad GongdanMessagePage');
  }
  ionViewWillEnter(){
    //this.getGongdanDetail();
  }
  ionViewDidEnter(){//进入了一个页面且变成了当前的激活页面，该事件不管是第一次进入还是缓存后进入都将执行。
    this.nextStatus();
  }

  buttons:any=[];
  StatusButton() {//流程按钮
    let that = this;
    that.actionSheetCtrl.create(
      {
        buttons: this.buttons
      }).present();
  }
}
