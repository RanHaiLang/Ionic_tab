import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, ActionSheetController} from 'ionic-angular';
import {FileObj} from "../../../../model/FileObj";
import {FormBuilder, Validators} from "@angular/forms";
import {JiuzhengxingweixiugongdanListPage} from "../../jiuzhengxingweixiugongdan-list";
import {HttpService} from "../../../../prodivers/httpService";
import {NativeService} from "../../../../prodivers/nativeService";
import {HandwrittenSignature} from "../../../../shared/handwritten-signature/handwritten-signature";
import {OilStationEquipmentSelection} from "../../../../shared/oil-station-equipment-selection/oil-station-equipment-selection";
import {SupplierPage} from "../../../../shared/supplier/supplier";
import {RiskPriorityPage} from "../../../../shared/risk-priority/risk-priority";
import {Storage} from "@ionic/storage";
import {OpinionPage} from "../../../../shared/opinion/opinion";
import {JiuzhengxingweixiuPage} from "../jiuzhengxingweixiu";
import {CurrencyPage} from "../../../../shared/currency/currency";
import {PersonInChargePage} from "../../../../shared/person-in-charge/person-in-charge";
import {ClassificationPage} from "../../../../shared/classification/classification";

/**
 * Generated class for the JiuzhengxingweixiugongdanMessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jiuzhengxingweixiugongdan-message',
  templateUrl: 'jiuzhengxingweixiugongdan-message.html',
})
export class JiuzhengxingweixiugongdanMessagePage {

  MessageForm:any;
  fileObjList: FileObj[] = [];
  filePaths: FileObj[] = [];
  jzxwxDetail:any=[]
  jzxwxImageDate:any=[]
  jzxwxOpinion:any=[]
  mrc:string;
  username:string="";
  evt_class:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,
              public httpService:HttpService,public nativeService:NativeService,public modalCtrl:ModalController,
              public storage:Storage,private actionSheetCtrl: ActionSheetController) {
    this.jzxwxDetail = this.navParams.get("jzxwxDetail");//获取详细信息

    /**********************图片上传时用到*******************************/
    this.storage.set("evt_code",this.jzxwxDetail.evt_code);//存储evt_code，用于上传图片
    this.storage.set("ImgUploadUrl",'evtuploadqm');
    /**********************end*******************************/

    this.storage.get("jzxwxImageDate").then((res)=>{
      this.jzxwxImageDate =res;
      for(var i=0;i<this.jzxwxImageDate.length;i++){
        var suffix = this.jzxwxImageDate[i].doc_filename.substring(this.jzxwxImageDate[i].doc_filename.lastIndexOf(".")+1);
        let fileObj = <FileObj>{'id':this.jzxwxImageDate[i].doc_code,'origPath': this.jzxwxImageDate[i].doc_filename, 'thumbPath': this.jzxwxImageDate[i].doc_filename, 'suffix':suffix};
        this.filePaths.push(fileObj);
      }
    })
    this.storage.get("username").then((res)=>{
      this.username=res;
    })
    this.storage.get("jzxwxOpinion").then((res)=>{
      this.jzxwxOpinion = res;
    })
    this.storage.get("mrc").then((res)=>{
      this.mrc = res;
    })
    this.MessageForm = this.formBuilder.group({
      evt_code:[this.jzxwxDetail.evt_code==null?"":this.jzxwxDetail.evt_code,[Validators.required]],
      evt_desc:[this.jzxwxDetail.evt_desc==null?"":this.jzxwxDetail.evt_desc,[Validators.required]],
      obj_desc:[this.jzxwxDetail.obj_desc==null?"":this.jzxwxDetail.obj_desc,[Validators.required]],
      evt_object:[this.jzxwxDetail.evt_object==null?"":this.jzxwxDetail.evt_object,[Validators.required]],//设备代码
      evt_object_org:[this.jzxwxDetail.evt_object_org==null?"":this.jzxwxDetail.evt_object_org,[Validators.required]],//设备组织
      des_text:[this.jzxwxDetail.des_text==null?"":this.jzxwxDetail.des_text,[Validators.required]],//油站名称
      evt_location:[this.jzxwxDetail.evt_location==null?"":this.jzxwxDetail.evt_location,[Validators.required]],//油站代码
      evt_location_org:[this.jzxwxDetail.evt_location_org==null?"":this.jzxwxDetail.evt_location_org,[Validators.required]],//组织
      uco_desc:[this.jzxwxDetail.uco_desc==null?"":this.jzxwxDetail.uco_desc,[Validators.required]],
      evt_status:[this.jzxwxDetail.evt_status==null?"":this.jzxwxDetail.evt_status,[Validators.required]],
      uco_desc3:[this.jzxwxDetail.uco_desc3==null?"":this.jzxwxDetail.uco_desc3,[Validators.required]],//优先级描述
      evt_priority:[this.jzxwxDetail.evt_priority==null?"":this.jzxwxDetail.evt_priority,[Validators.required]],//优先级代码
      evt_class:[this.jzxwxDetail.evt_class==null?"":this.jzxwxDetail.evt_class,[Validators.required]],//分类
      cls_desc:[this.jzxwxDetail.cls_desc==null?"":this.jzxwxDetail.cls_desc,[Validators.required]],//分类描述
      evt_schedgrp:[this.jzxwxDetail.evt_schedgrp==null?"":this.jzxwxDetail.evt_schedgrp,[Validators.required]],//负责人
      per_desc:[this.jzxwxDetail.per_desc==null?"":this.jzxwxDetail.per_desc,[Validators.required]],//负责人描述
      evt_udfdate03:[this.jzxwxDetail.evt_udfdate03==null?"":this.jzxwxDetail.evt_udfdate03,[Validators.required]],
      evt_udfdate04:[this.jzxwxDetail.evt_udfdate04==null?"":this.jzxwxDetail.evt_udfdate04,[Validators.required]],
      evt_udfdate02:[this.jzxwxDetail.evt_udfdate02==null?"":this.jzxwxDetail.evt_udfdate02,[Validators.required]],
      com_desc:[this.jzxwxDetail.com_desc==null?"":this.jzxwxDetail.com_desc,[Validators.required]],//供应商描述
      evt_udfchar30:[this.jzxwxDetail.evt_udfchar30==null?"":this.jzxwxDetail.evt_udfchar30,[Validators.required]],//供应商代码
      evt_udfnum01:[this.jzxwxDetail.evt_udfnum01==null?"":this.jzxwxDetail.evt_udfnum01,[Validators.required]],
      evt_workaddress:[this.jzxwxDetail.evt_workaddress==null?"":this.jzxwxDetail.evt_workaddress,[Validators.required]],
      evt_udfchar10:[this.jzxwxDetail.evt_udfchar10==null?"":this.jzxwxDetail.evt_udfchar10,[Validators.required]],
      evt_udfchar12:[this.jzxwxDetail.evt_udfchar12==null?"":this.jzxwxDetail.evt_udfchar12,[Validators.required]],
      evt_udfchar13:[this.jzxwxDetail.evt_udfchar13==null?"":this.jzxwxDetail.evt_udfchar13,[Validators.required]],
      evt_udfchar17:[this.jzxwxDetail.evt_udfchar17==null?"":this.jzxwxDetail.evt_udfchar17,[Validators.required]],
    })
  }

  backPage(){
    this.navCtrl.push(JiuzhengxingweixiugongdanListPage)
  }

  //设备选择
  getShebei(){
    if(this.jzxwxDetail.evt_status=='BI05'||this.jzxwxDetail.evt_status=='CI05'||this.jzxwxDetail.evt_status=='DI05'){
    }else {
      let modal = this.modalCtrl.create(OilStationEquipmentSelection,{
        key:"equiment",
        url:'searchObj',
        evt_mrc:this.mrc,
        title:"设备描述"
      });
      modal.onDidDismiss(data=>{
        if(data=='无'){
          this.MessageForm.controls['obj_desc'].setValue("")
          this.MessageForm.controls['evt_object'].setValue("");
          this.MessageForm.controls['evt_object_org'].setValue("")
        }else {
          if(data.com_desc!=undefined){
            this.MessageForm.controls['obj_desc'].setValue(data.com_desc)
            this.MessageForm.controls['evt_object'].setValue(data.com_code);
            this.MessageForm.controls['evt_object_org'].setValue(data.com_org)
          }
        }

      });
      modal.present();
    }
  }

  //油站名称
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

  //获取优先级
  getPriority(){
    if(this.jzxwxDetail.evt_status=='BI05'||this.jzxwxDetail.evt_status=='CI05'||this.jzxwxDetail.evt_status=='DI05'){
    }else {
      let modal = this.modalCtrl.create(RiskPriorityPage,{
        key:"1",
        title:"优先级"
      });
      modal.onDidDismiss(data=>{
        if(data=='无'){
          console.log(data.uco_desc)
          this.MessageForm.controls['evt_priority'].setValue("");
          this.MessageForm.controls['uco_desc3'].setValue("");
        }else {
          if(data.uco_code!=undefined){
            this.MessageForm.controls['evt_priority'].setValue(data.uco_code);
            this.MessageForm.controls['uco_desc3'].setValue(data.uco_desc);
          }
        }
      });
      modal.present();
    }
  }

  //获取分类
  getClassification(){
    let modal = this.modalCtrl.create(ClassificationPage,{
      fltype:'n'
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
  //供应商
  getSupplier(){
    if(this.jzxwxDetail.evt_status=='BI05'||this.jzxwxDetail.evt_status=='CI05'||this.jzxwxDetail.evt_status=='DI05'){
    }else {
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
  }
  //供应商评价
  getCurrency(title,udfchar){
    if(this.jzxwxDetail.evt_status!='BI05'&&this.jzxwxDetail.evt_status!='CI05'&&this.jzxwxDetail.evt_status!='DI05'){
    }else {
      let modal = this.modalCtrl.create(CurrencyPage, {
        title: title,
        udfchar: udfchar
      });
      modal.onDidDismiss(data => {
        if (data == '无') {
          if (udfchar == 'udfchar10') {
            this.MessageForm.controls['evt_udfchar10'].setValue("")
          } else if (udfchar == 'udfchar12') {
            this.MessageForm.controls['evt_udfchar12'].setValue("")
          } else if (udfchar == 'udfchar13') {
            this.MessageForm.controls['evt_udfchar13'].setValue("")
          } else if (udfchar == 'udfchar17') {
            this.MessageForm.controls['evt_udfchar17'].setValue("")
          }
        } else {
          if (data.com_code != undefined) {
            if (udfchar == 'udfchar10') {
              this.MessageForm.controls['evt_udfchar10'].setValue(data.com_code)
            } else if (udfchar == 'udfchar12') {
              this.MessageForm.controls['evt_udfchar12'].setValue(data.com_code)
            } else if (udfchar == 'udfchar13') {
              this.MessageForm.controls['evt_udfchar13'].setValue(data.com_code)
            } else if (udfchar == 'udfchar17') {
              this.MessageForm.controls['evt_udfchar17'].setValue(data.com_code)
            }
          }
        }

      });
      modal.present();
    }
  }

  openTime(key){
    if(this.jzxwxDetail.evt_status=='BI05'||this.jzxwxDetail.evt_status=='CI05'||this.jzxwxDetail.evt_status=='DI05'){
    }else {
      this.nativeService.datePickerss().subscribe(date => {
        console.log(date);
        if (key == 'evt_udfdate04') {
          this.MessageForm.controls['evt_udfdate04'].setValue(date)
        } else if (key == 'evt_udfdate02') {
          this.MessageForm.controls['evt_udfdate02'].setValue(date)
        } else if (key == 'evt_udfdate03') {
          this.MessageForm.controls['evt_udfdate03'].setValue(date)
        }
      })
    }
  }

  //获取下一步状态按钮
  statusButton:any=[];
  nextStatus(){
    this.storage.get("username").then((username)=>{
      var url = this.httpService.url + "/appEvent/evtnexttype?evtstatus="+this.jzxwxDetail.evt_status+"&username="+username;
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.statusButton = data['result']
        for(let i=0;i<this.statusButton.length;i++){
          this.buttons.push({text:this.statusButton[i].autstatnewdesc,handler:()=>{this.submitMessage('updateStatus',this.statusButton[i].aut_statnew)}})
        }
        this.buttons.push({text: '取消',role: 'cancel'})
        if(this.jzxwxDetail.evt_rstatus=='C'||this.buttons.length==1){
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

  //保存
  submitMessage(key,aut_status){
    this.MessageForm.controls['evt_udfnum01'].setValue(this.MessageForm.value.evt_udfnum01+"")
    //非空判断
    if(this.MessageForm.value.evt_desc==null||this.MessageForm.value.evt_desc==""||
      this.MessageForm.value.obj_desc==null||this.MessageForm.value.obj_desc==""||
      this.MessageForm.value.uco_desc3==null||this.MessageForm.value.uco_desc3==""||
      this.MessageForm.value.evt_class==null||this.MessageForm.value.evt_class==""
    ){
      this.nativeService.showToast("请填写*号部分")
    }else {
      if(this.jzxwxDetail.evt_status=='BI05'||this.jzxwxDetail.evt_status=='CI05'||this.jzxwxDetail.evt_status=='DI05'){
        if(this.MessageForm.value.evt_udfchar10==null||this.MessageForm.value.evt_udfchar10==""||
          this.MessageForm.value.evt_udfchar12==null||this.MessageForm.value.evt_udfchar12==""||
          this.MessageForm.value.evt_udfchar13==null||this.MessageForm.value.evt_udfchar13==""||
          this.MessageForm.value.evt_udfchar17==null||this.MessageForm.value.evt_udfchar17==""){
          this.nativeService.showToast("请填写*号部分")
        }else {
          var url =this.httpService.url +"/appEvent/updatetotalevt";
          let body = "evt_code="+this.MessageForm.value.evt_code+"&evt_desc="+this.MessageForm.value.evt_desc
            +"&evt_location="+this.MessageForm.value.evt_location+"&evt_priority="+this.MessageForm.value.evt_priority
            +"&evt_udfdate03="+this.MessageForm.value.evt_udfdate03+"&evt_udfdate04="+this.MessageForm.value.evt_udfdate04
            +"&evt_udfdate02="+this.MessageForm.value.evt_udfdate02+"&evt_udfchar30="+this.MessageForm.value.evt_udfchar30
            +"&evt_udfnum01="+this.MessageForm.value.evt_udfnum01+"&evt_workaddress="+this.MessageForm.value.evt_workaddress
            +"&evt_location_org="+this.MessageForm.value.evt_location_org+"&evt_object="+this.MessageForm.value.evt_object
            +"&evt_object_org="+this.MessageForm.value.evt_object_org+"&evt_udfchar10="+this.MessageForm.value.evt_udfchar10
            +"&evt_udfchar12="+this.MessageForm.value.evt_udfchar12+"&evt_udfchar13="+this.MessageForm.value.evt_udfchar13
            +"&evt_udfchar17="+this.MessageForm.value.evt_udfchar17+"&evt_updatedby="+this.username
            +"&evt_class="+this.MessageForm.value.evt_class+"&evt_schedgrp="+this.MessageForm.value.evt_schedgrp;
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
      }else {
        var url =this.httpService.url +"/appEvent/updatetotalevt";
        let body = "evt_code="+this.MessageForm.value.evt_code+"&evt_desc="+this.MessageForm.value.evt_desc
          +"&evt_location="+this.MessageForm.value.evt_location+"&evt_priority="+this.MessageForm.value.evt_priority
          +"&evt_udfdate03="+this.MessageForm.value.evt_udfdate03+"&evt_udfdate04="+this.MessageForm.value.evt_udfdate04
          +"&evt_udfdate02="+this.MessageForm.value.evt_udfdate02+"&evt_udfchar30="+this.MessageForm.value.evt_udfchar30
          +"&evt_udfnum01="+this.MessageForm.value.evt_udfnum01+"&evt_workaddress="+this.MessageForm.value.evt_workaddress
          +"&evt_location_org="+this.MessageForm.value.evt_location_org+"&evt_object="+this.MessageForm.value.evt_object
          +"&evt_object_org="+this.MessageForm.value.evt_object_org+"&evt_udfchar10="+this.MessageForm.value.evt_udfchar10
          +"&evt_udfchar12="+this.MessageForm.value.evt_udfchar12+"&evt_udfchar13="+this.MessageForm.value.evt_udfchar13
          +"&evt_udfchar17="+this.MessageForm.value.evt_udfchar17+"&evt_updatedby="+this.username
          +"&evt_class="+this.MessageForm.value.evt_class+"&evt_schedgrp="+this.MessageForm.value.evt_schedgrp;
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

  //获取详细信息
  getDetail(){
    var url = this.httpService.url + "/appEvent/evtpmwhdetail?evt_code="+this.jzxwxDetail.evt_code;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.storage.set("jzxwxDetail",data['result']);
      this.storage.set("jzxwxImageDate",data['r5rmDocs']);
      this.storage.set("jzxwxOpinion",data['adDetails']);//存储审批意见
      this.navCtrl.push(JiuzhengxingweixiuPage,{
        jzxwxDetail:data['result']
      })
    })
  }

  //状态更新
  updateStatus(aut_status){
    //手写签名
    let modal = this.modalCtrl.create(HandwrittenSignature,{
      evt_code:this.jzxwxDetail.evt_code,
      evt_statu:this.jzxwxDetail.evt_status
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
                //this.navCtrl.push(JiuzhengxingweixiugongdanListPage)
                this.getDetail()
              }else {
                this.nativeService.showToast(data['message'])
              }
            })
          }else {
            this.getDetail();
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
    console.log('ionViewDidLoad JiuzhengxingweixiugongdanMessagePage');
  }

  ionViewDidEnter(){//进入了一个页面且变成了当前的激活页面，该事件不管是第一次进入还是缓存后进入都将执行。
    this.nextStatus();
  }
}
