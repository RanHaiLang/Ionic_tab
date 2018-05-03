import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, ActionSheetController} from 'ionic-angular';
import {FileObj} from "../../../../model/FileObj";
import {FormBuilder, Validators} from "@angular/forms";
import {XiaoweixiugongdanListPage} from "../../xiaoweixiugongdan-list";
import {HandwrittenSignature} from "../../../../shared/handwritten-signature/handwritten-signature";
import {NativeService} from "../../../../prodivers/nativeService";
import {SupplierPage} from "../../../../shared/supplier/supplier";
import {OilStationEquipmentSelection} from "../../../../shared/oil-station-equipment-selection/oil-station-equipment-selection";
import {HttpService} from "../../../../prodivers/httpService";
import {Storage} from "@ionic/storage";
import {OpinionPage} from "../../../../shared/opinion/opinion";
import {XiaoweixiuPage} from "../xiaoweixiu";
import {PersonInChargePage} from "../../../../shared/person-in-charge/person-in-charge";
import {ClassificationPage} from "../../../../shared/classification/classification";

/**
 * Generated class for the XiaoweixiugongdanMessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xiaoweixiugongdan-message',
  templateUrl: 'xiaoweixiugongdan-message.html',
})
export class XiaoweixiugongdanMessagePage {

  MessageForm:any;
  fileObjList: FileObj[] = [];
  filePaths: FileObj[] = [];
  xwxDetail:any=[];
  xwxImageDate:any=[];
  xwxOpinion:any=[];//审批意见
  username:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder:FormBuilder,public modalCtrl:ModalController,
              public nativeService:NativeService,public httpService:HttpService,
              public storage:Storage,private actionSheetCtrl: ActionSheetController) {
    this.xwxDetail = this.navParams.get("xwxDetail");

    /**********************图片上传时用到*******************************/
    this.storage.set("evt_code",this.xwxDetail.evt_code);//存储evt_code，用于上传图片
    this.storage.set("ImgUploadUrl",'evtuploadqm');
    /**********************end*******************************/

    this.storage.get("xwxImageDate").then((res)=>{
      this.xwxImageDate =res;
      for(var i=0;i<this.xwxImageDate.length;i++){
        var suffix = this.xwxImageDate[i].doc_filename.substring(this.xwxImageDate[i].doc_filename.lastIndexOf(".")+1);
        let fileObj = <FileObj>{'id':this.xwxImageDate[i].doc_code,'origPath': this.xwxImageDate[i].doc_filename, 'thumbPath': this.xwxImageDate[i].doc_filename, 'suffix':suffix};
        this.filePaths.push(fileObj);
      }
    })
    this.storage.get("username").then((res)=>{
      this.username=res;
    })
    this.storage.get("xwxOpinion").then((res)=>{
      this.xwxOpinion = res;
    })
    this.MessageForm = this.formBuilder.group({
      evt_code:[this.xwxDetail.evt_code==null?"":this.xwxDetail.evt_code,[Validators.required]],
      evt_desc:[this.xwxDetail.evt_desc==null?"":this.xwxDetail.evt_desc,[Validators.required]],
      obj_desc:[this.xwxDetail.obj_desc==null?"":this.xwxDetail.obj_desc,[Validators.required]],
      des_text:[this.xwxDetail.des_text==null?"":this.xwxDetail.des_text,[Validators.required]],//油站名称
      evt_location:[this.xwxDetail.evt_location==null?"":this.xwxDetail.evt_location,[Validators.required]],//油站代码
      evt_location_org:[this.xwxDetail.evt_location_org==null?"":this.xwxDetail.evt_location_org,[Validators.required]],//组织
      evt_status:[this.xwxDetail.evt_status==null?"":this.xwxDetail.evt_status,[Validators.required]],
      uco_desc:[this.xwxDetail.uco_desc==null?"":this.xwxDetail.uco_desc,[Validators.required]],
      evt_class:[this.xwxDetail.evt_class==null?"":this.xwxDetail.evt_class,[Validators.required]],//分类
      cls_desc:[this.xwxDetail.cls_desc==null?"":this.xwxDetail.cls_desc,[Validators.required]],//分类描述
      evt_schedgrp:[this.xwxDetail.evt_schedgrp==null?"":this.xwxDetail.evt_schedgrp,[Validators.required]],//负责人
      per_desc:[this.xwxDetail.per_desc==null?"":this.xwxDetail.per_desc,[Validators.required]],//负责人描述
      evt_start:[this.xwxDetail.evt_start==null?"":this.xwxDetail.evt_start,[Validators.required]],
      evt_completed:[this.xwxDetail.evt_completed==null?"":this.xwxDetail.evt_completed,[Validators.required]],
      com_desc:[this.xwxDetail.com_desc==null?"":this.xwxDetail.com_desc,[Validators.required]],//供应商描述
      evt_udfchar30:[this.xwxDetail.evt_udfchar30==null?"":this.xwxDetail.evt_udfchar30,[Validators.required]],//供应商代码
      evt_udfnum01:[this.xwxDetail.evt_udfnum01==null?"":this.xwxDetail.evt_udfnum01,[Validators.required]],
      evt_udfnum02:[this.xwxDetail.evt_udfnum02==null?"":this.xwxDetail.evt_udfnum02,[Validators.required]],
      evt_workaddress:[this.xwxDetail.evt_workaddress==null?"":this.xwxDetail.evt_workaddress,[Validators.required]],
    })
  }

  backPage(){
    this.navCtrl.push(XiaoweixiugongdanListPage)
  }

  getYouzhan(){
    let modal = this.modalCtrl.create(OilStationEquipmentSelection,{
      key:"oil",
      url:'getevtlocationByPage',
      title:"油站名称"
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        this.MessageForm.controls['des_text'].setValue("")
        this.MessageForm.controls['evt_location'].setValue("")
        this.MessageForm.controls['evt_location_org'].setValue("")
      }else {
        if(data.com_code!=undefined){
          this.MessageForm.controls['des_text'].setValue(data.com_desc)
          this.MessageForm.controls['evt_location'].setValue(data.com_code)
          this.MessageForm.controls['evt_location_org'].setValue(data.com_org)
        }
      }
    });
    modal.present();
  }

  //获取分类
  getClassification(){
    let modal = this.modalCtrl.create(ClassificationPage,{
      fltype:'y'
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        console.log(data.com_code)
        this.MessageForm.controls['evt_class'].setValue("");
        this.MessageForm.controls['cls_desc'].setValue("");
      }else {
        if(data.com_code!=undefined){
          this.MessageForm.controls['evt_class'].setValue(data.com_code);
          this.MessageForm.controls['cls_desc'].setValue(data.com_desc);
        }
      }
    });
    modal.present();
  }

  //获取负责人
  getPersonInCharge(){
    let modal = this.modalCtrl.create(PersonInChargePage,{
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        console.log(data.com_code)
        this.MessageForm.controls['evt_schedgrp'].setValue("");
        this.MessageForm.controls['per_desc'].setValue("");
      }else {
        if(data.com_code!=undefined){
          this.MessageForm.controls['evt_schedgrp'].setValue(data.com_code);
          this.MessageForm.controls['per_desc'].setValue(data.com_desc);
        }
      }
    });
    modal.present();
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
      var url = this.httpService.url + "/appEvent/evtnexttype?evtstatus="+this.xwxDetail.evt_status+"&username="+username;
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.statusButton = data['result']
        console.log(this.statusButton)
        for(let i=0;i<this.statusButton.length;i++){
          this.buttons.push({text:this.statusButton[i].autstatnewdesc,handler:()=>{this.submitMessage('updateStatus',this.statusButton[i].aut_statnew)}})
        }
        this.buttons.push({text: '取消',role: 'cancel'})
        if(this.xwxDetail.evt_rstatus=='C'||this.buttons.length==1){
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
    if(this.MessageForm.value.evt_udfnum02=="0"){
      this.MessageForm.controls['evt_udfnum02'].setValue(0+"")
    }
    //非空判断
    if(
      this.MessageForm.value.evt_desc==null||this.MessageForm.value.evt_desc==""||
      this.MessageForm.value.evt_udfnum02==null||this.MessageForm.value.evt_udfnum02==""||
      this.MessageForm.value.evt_class==null||this.MessageForm.value.evt_class==""
    ){
      this.nativeService.showToast("请填写*号部分")
    }else {
        if(this.MessageForm.value.evt_udfnum02>600){
          this.nativeService.showToast("小维修金额不能超过600")
        }else {
          var evt_start = new Date(this.MessageForm.value.evt_start).valueOf();
          var evt_completed = new Date(this.MessageForm.value.evt_completed).valueOf();
          var evt_created = new Date(this.MessageForm.value.evt_created).valueOf();//工单创建时间
          if(evt_created>evt_start){
            this.nativeService.showToast("开始日期必须晚于工单创建日期")
          }else {
            if(evt_start>evt_completed){
              this.nativeService.showToast("开始日期必须早于结束日期")
            }else {
              if(this.MessageForm.value.evt_udfnum02<0){
                this.nativeService.showToast("小维修金额必须大于等于0")
              }else {
                if(this.MessageForm.value.evt_udfnum01==""){
                  this.MessageForm.controls['evt_udfnum01'].setValue(0)
                }
                var url = this.httpService.url + "/appEvent/updatetotalevt";
                let body = "evt_code="+this.MessageForm.value.evt_code+"&evt_desc="+this.MessageForm.value.evt_desc
                  +"&evt_location="+this.MessageForm.value.evt_location+"&evt_start="+this.MessageForm.value.evt_start
                  +"&evt_completed="+this.MessageForm.value.evt_completed+"&evt_udfchar30="+this.MessageForm.value.evt_udfchar30
                  +"&evt_udfnum01="+this.MessageForm.value.evt_udfnum01+"&evt_udfnum02="+this.MessageForm.value.evt_udfnum02
                  +"&evt_workaddress="+this.MessageForm.value.evt_workaddress+"&evt_location_org="+this.MessageForm.value.evt_location_org
                  +"&evt_class="+this.MessageForm.value.evt_class+"&evt_schedgrp="+this.MessageForm.value.evt_schedgrp
                  +"&evt_updatedby="+this.username;
                this.httpService.post(url,body).subscribe((res)=>{
                  let data = res.json();
                  if(data['resultCode']==1){
                    if(key=='updateStatus'){//状态更新
                      this.updateStatus(aut_status);
                    }else {
                      this.nativeService.showToast(data['message'])
                      this.getDetail()
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

  //获取详情
  getDetail(){
    var url = this.httpService.url +"/appEvent/evtpmwhdetail?evt_code="+this.MessageForm.value.evt_code;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.storage.set("xwxDetail",data['result']);
      this.storage.set("xwxImageDate",data['r5rmDocs']);
      this.storage.set("xwxOpinion",data['adDetails']);//存储审批意见
      this.navCtrl.push(XiaoweixiuPage,{
        xwxDetail:data['result']
      })
    })
  }
  //状态更新
  updateStatus(aut_status){
    //手写签名
    let modal = this.modalCtrl.create(HandwrittenSignature,{
      evt_code:this.xwxDetail.evt_code,
      evt_statu:this.xwxDetail.evt_status
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
                //this.navCtrl.push(XiaoweixiugongdanListPage)
                this.getDetail()
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

  buttons:any=[];
  StatusButton() {//流程按钮
    let that = this;
    that.actionSheetCtrl.create(
      {
        buttons: this.buttons
      }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad XiaoweixiugongdanMessagePage');
  }
  ionViewDidEnter(){//进入了一个页面且变成了当前的激活页面，该事件不管是第一次进入还是缓存后进入都将执行。
    this.nextStatus();
  }

}
