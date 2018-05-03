import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, ActionSheetController} from 'ionic-angular';
import {FileObj} from "../../../../model/FileObj";
import {Validators, FormBuilder} from "@angular/forms";
import {XiangmugaizaogongdanListPage} from "../../xiangmugaizaogongdan-list";
import {HandwrittenSignature} from "../../../../shared/handwritten-signature/handwritten-signature";
import {NativeService} from "../../../../prodivers/nativeService";
import {SupplierPage} from "../../../../shared/supplier/supplier";
import {HttpService} from "../../../../prodivers/httpService";
import {Storage} from "@ionic/storage";
import {OpinionPage} from "../../../../shared/opinion/opinion";
import {XiangmugaizaoPage} from "../xiangmugaizao";

/**
 * Generated class for the GaizaogongdanMessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gaizaogongdan-message',
  templateUrl: 'gaizaogongdan-message.html',
})
export class GaizaogongdanMessagePage {

  MessageForm:any;
  fileObjList: FileObj[] = [];
  filePaths: FileObj[] = [];

  xmgzDetail:any=[];
  xmgzImageDate:any=[];
  xmgzOpinion:any=[];
  username:string=""
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder:FormBuilder,public modalCtrl:ModalController,
              public nativeService:NativeService,public httpService:HttpService,
              public storage:Storage,private actionSheetCtrl: ActionSheetController) {
    this.xmgzDetail = this.navParams.get("xmgzDetail");

    /**********************图片上传时用到*******************************/
    this.storage.set("evt_code",this.xmgzDetail.evt_code);//存储evt_code，用于上传图片
    this.storage.set("ImgUploadUrl",'evtuploadqm');
    /**********************end*******************************/

    this.storage.get("xmgzImageDate").then((res)=>{
      this.xmgzImageDate = res;
      for(var i=0;i<this.xmgzImageDate.length;i++){
        var suffix = this.xmgzImageDate[i].doc_filename.substring(this.xmgzImageDate[i].doc_filename.lastIndexOf(".")+1);
        let fileObj = <FileObj>{'id':this.xmgzImageDate[i].doc_code,'origPath': this.xmgzImageDate[i].doc_filename, 'thumbPath': this.xmgzImageDate[i].doc_filename, 'suffix':suffix};
        this.filePaths.push(fileObj);
      }
    })
    this.storage.get("username").then((res)=>{
      this.username=res;
    })
    this.storage.get("xmgzOpinion").then((res)=>{
      this.xmgzOpinion = res;
    })
    this.MessageForm = this.formBuilder.group({
      evt_code:[this.xmgzDetail.evt_code==null?"":this.xmgzDetail.evt_code,[Validators.required]],
      evt_desc:[this.xmgzDetail.evt_desc==null?"":this.xmgzDetail.evt_desc,[Validators.required]],
      obj_desc:[this.xmgzDetail.obj_desc==null?"":this.xmgzDetail.obj_desc,[Validators.required]],
      des_text:[this.xmgzDetail.des_text==null?"":this.xmgzDetail.des_text,[Validators.required]],
      evt_status:[this.xmgzDetail.evt_status==null?"":this.xmgzDetail.evt_status,[Validators.required]],
      uco_desc:[this.xmgzDetail.uco_desc==null?"":this.xmgzDetail.uco_desc,[Validators.required]],
      evt_target:[this.xmgzDetail.evt_target==null?"":this.xmgzDetail.evt_target,[Validators.required]],
      evt_schedend:[this.xmgzDetail.evt_schedend==null?"":this.xmgzDetail.evt_schedend,[Validators.required]],
      evt_start:[this.xmgzDetail.evt_start==null?"":this.xmgzDetail.evt_start,[Validators.required]],
      evt_completed:[this.xmgzDetail.evt_completed==null?"":this.xmgzDetail.evt_completed,[Validators.required]],
      com_desc:[this.xmgzDetail.com_desc==null?"":this.xmgzDetail.com_desc,[Validators.required]],//供应商描述
      evt_udfchar30:[this.xmgzDetail.evt_udfchar30==null?"":this.xmgzDetail.evt_udfchar30,[Validators.required]],//供应商代码
      evt_udfnum01:[this.xmgzDetail.evt_udfnum01==null?"":this.xmgzDetail.evt_udfnum01,[Validators.required]],
      evt_workaddress:[this.xmgzDetail.evt_workaddress==null?"":this.xmgzDetail.evt_workaddress,[Validators.required]],
    })
  }

  backPage(){
    this.navCtrl.push(XiangmugaizaogongdanListPage)
  }

  openTime(key){
    this.nativeService.datePickerss().subscribe(date=>{
      console.log(date);
      if(key=='evt_target'){
        this.MessageForm.controls['evt_target'].setValue(date)
      }else if(key=='evt_schedend'){
        this.MessageForm.controls['evt_schedend'].setValue(date)
      }else if(key=='evt_start'){
        this.MessageForm.controls['evt_start'].setValue(date)
      }else if(key=='evt_completed'){
        this.MessageForm.controls['evt_completed'].setValue(date)
      }
    })
  }
  //供应商
  getSupplier(){
    let modal = this.modalCtrl.create(SupplierPage,{
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        this.MessageForm.controls['evt_udfchar30'].setValue("")
        this.MessageForm.controls['com_desc'].setValue("")
      }else {
        if(data.com_code!=undefined&&data.com_desc!=undefined){
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
      var url = this.httpService.url + "/appEvent/evtnexttype?evtstatus="+this.xmgzDetail.evt_status+"&username="+username;
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.statusButton = data['result']
        console.log(this.statusButton)
        for(let i=0;i<this.statusButton.length;i++){
          this.buttons.push({text:this.statusButton[i].autstatnewdesc,handler:()=>{this.submitMessage('updateStatus',this.statusButton[i].aut_statnew)}})
        }
        this.buttons.push({text: '取消',role: 'cancel'})
        if(this.xmgzDetail.evt_rstatus=='C'||this.buttons.length==1){
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
    if(this.MessageForm.value.evt_udfnum01=="0"){
      this.MessageForm.controls['evt_udfnum01'].setValue(0+"")
    }
    //非空判断
    if(
      this.MessageForm.value.evt_desc==null||this.MessageForm.value.evt_desc==""||
      this.MessageForm.value.evt_target==null||this.MessageForm.value.evt_target==""||
      this.MessageForm.value.evt_schedend==null||this.MessageForm.value.evt_schedend==""||
      this.MessageForm.value.evt_start==null||this.MessageForm.value.evt_start==""||
      this.MessageForm.value.evt_completed==null||this.MessageForm.value.evt_completed==""||
      this.MessageForm.value.com_desc==null||this.MessageForm.value.com_desc==""||
      this.MessageForm.value.evt_udfnum01==null||this.MessageForm.value.evt_udfnum01==""||
      this.MessageForm.value.evt_workaddress==null||this.MessageForm.value.evt_workaddress==""
    ){
      this.nativeService.showToast("请填写*号部分")
    }else {
      var evt_target = new Date(this.MessageForm.value.evt_target).valueOf();//计划开始
      var evt_schedend = new Date(this.MessageForm.value.evt_schedend).valueOf();//计划结束
      var evt_start = new Date(this.MessageForm.value.evt_start).valueOf();//开始
      var evt_completed = new Date(this.MessageForm.value.evt_completed).valueOf();//结束
      var evt_created = new Date(this.MessageForm.value.evt_created).valueOf();//工单创建时间
      if(evt_created>evt_target){
        this.nativeService.showToast("计划开始日期必须晚于工单创建日期");
      }else {
        if(evt_created>evt_start){
          this.nativeService.showToast("开始日期必须晚于工单创建日期");
        }else {
          if(evt_target>evt_schedend){
            this.nativeService.showToast("计划开始日期必须早于计划结束日期");
          }else {
            if(evt_start>evt_completed){
              this.nativeService.showToast("开始日期必须早于结束日期");
            }else {
              this.MessageForm.controls['evt_udfnum01'].setValue(this.MessageForm.value.evt_udfnum01+"");
              var url = this.httpService.url + "/appEvent/updatetotalevt";
              let body = "evt_code="+this.MessageForm.value.evt_code+"&evt_desc="+this.MessageForm.value.evt_desc
                +"&evt_target="+this.MessageForm.value.evt_target+"&evt_schedend="+this.MessageForm.value.evt_schedend
                +"&evt_start="+this.MessageForm.value.evt_start+"&evt_completed="+this.MessageForm.value.evt_completed
                +"&evt_udfchar30="+this.MessageForm.value.evt_udfchar30+"&evt_udfnum01="+this.MessageForm.value.evt_udfnum01
                +"&evt_workaddress="+this.MessageForm.value.evt_workaddress+"&evt_updatedby="+this.username;
              this.httpService.post(url,body).subscribe((res)=>{
                let data = res.json();
                if(data['resultCode']==1){
                  if(key=='updateStatus'){//状态更新
                    this.updateStatus(aut_status);
                  }else {
                    this.nativeService.showToast(data['message'])
                    this.getDetail();
                  }
                }else {
                  this.nativeService.showToast(data['message'])
                }
              })
            }
          }
        }
      }
    }
  }

  //获取详细信息
  getDetail(){
    var url = this.httpService.url +"/appEvent/evtpmwhdetail?evt_code="+this.MessageForm.value.evt_code;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.storage.set("xmgzDetail",data['result']);
      this.storage.set("xmgzImageDate",data['r5rmDocs']);
      this.storage.set("xmgzOpinion",data['adDetails']);//存储审批意见
      this.navCtrl.push(XiangmugaizaoPage,{
        xmgzDetail:data['result']
      })
    })
  }

  //状态更新
  updateStatus(aut_status){
    //手写签名
    let modal = this.modalCtrl.create(HandwrittenSignature,{
      evt_code:this.xmgzDetail.evt_code,
      evt_statu:this.xmgzDetail.evt_status
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
                //this.navCtrl.push(XiangmugaizaogongdanListPage)
                this.getDetail();
              }else {
                this.nativeService.showToast(data['message'])
              }
            })
          }else {
            this.getDetail()
          }
        })
        modals.present();
      }else {
        this.getDetail()
      }
    });
    modal.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GaizaogongdanMessagePage');
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
