import {Component, ChangeDetectorRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, Nav, ActionSheetController} from 'ionic-angular';
import {FileObj} from "../../../../model/FileObj";
import {Validators, FormBuilder} from "@angular/forms";
import {GongzuoxukezhengListPage} from "../../gongzuoxukezheng-list";
import {HandwrittenSignature} from "../../../../shared/handwritten-signature/handwritten-signature";
import {HttpService} from "../../../../prodivers/httpService";
import {Storage} from "@ionic/storage";
import {OilStationEquipmentSelection} from "../../../../shared/oil-station-equipment-selection/oil-station-equipment-selection";
import {SupplierPage} from "../../../../shared/supplier/supplier";
import {NativeService} from "../../../../prodivers/nativeService";
import {RiskPriorityPage} from "../../../../shared/risk-priority/risk-priority";
import {LicenseCategoryPage} from "../../../../shared/license-category/license-category";
import {OpinionPage} from "../../../../shared/opinion/opinion";
import {GongzuoxukezhengPage} from "../gongzuoxukezheng";
import {JobNumberPage} from "../../../../shared/job-number/job-number";
import {ExaminerPage} from "../../../../shared/examiner/examiner";

/**
 * Generated class for the GongzuoxukezhengMessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gongzuoxukezheng-message',
  templateUrl: 'gongzuoxukezheng-message.html',
})
export class GongzuoxukezhengMessagePage {

  MessageForm:any;
  @ViewChild(Nav) nav: Nav;
  fileObjList: FileObj[] = [];
  filePaths: FileObj[] = [];

  gzxkzgdDetail:any=[];
  xkzImageDate:any=[];
  XKZOpinion:any=[];
  username:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,
              public modalCtrl:ModalController,public httpService:HttpService,public storage:Storage,
              public nativeService:NativeService,public cd:ChangeDetectorRef,private actionSheetCtrl: ActionSheetController) {
    this.gzxkzgdDetail = this.navParams.get("gzxkzgdDetail");//获取详细信息

    /**********************图片上传时用到*******************************/
    this.storage.set("evt_code",this.gzxkzgdDetail.evt_code);//存储evt_code，用于上传图片
    this.storage.set("ImgUploadUrl",'evtuploadqm');
    /**********************end*******************************/

    this.storage.get("xkzImageDate").then((res)=>{
      this.xkzImageDate =res;
      for(var i=0;i<this.xkzImageDate.length;i++){
        var suffix = this.xkzImageDate[i].doc_filename.substring(this.xkzImageDate[i].doc_filename.lastIndexOf(".")+1);
        let fileObj = <FileObj>{'id':this.xkzImageDate[i].doc_code,'origPath': this.xkzImageDate[i].doc_filename, 'thumbPath': this.xkzImageDate[i].doc_filename, 'suffix':suffix};
        this.filePaths.push(fileObj);
      }
    })
    this.storage.get("username").then((res)=>{
      this.username=res;
    })
    this.storage.get("XKZOpinion").then((res)=>{
      this.XKZOpinion = res;
    })
    this.MessageForm = this.formBuilder.group({
      evt_code:[this.gzxkzgdDetail.evt_code==null?"":this.gzxkzgdDetail.evt_code,[Validators.required]],
      evt_parent:[this.gzxkzgdDetail.evt_parent==null?"":this.gzxkzgdDetail.evt_parent,[Validators.required]],//工单号
      evt_desc:[this.gzxkzgdDetail.evt_desc==null?"":this.gzxkzgdDetail.evt_desc,[Validators.required]],//许可证描述
      des_text:[this.gzxkzgdDetail.des_text==null?"":this.gzxkzgdDetail.des_text,[Validators.required]],//油站描述
      evt_location:[this.gzxkzgdDetail.evt_location==null?"":this.gzxkzgdDetail.evt_location,[Validators.required]],//油站代码
      evt_person:[this.gzxkzgdDetail.evt_person==null?"":this.gzxkzgdDetail.evt_person,[Validators.required]],//检查人
      per_descperson:[this.gzxkzgdDetail.per_descperson==null?"":this.gzxkzgdDetail.per_descperson,[Validators.required]],//检查人描述
      evt_location_org:[this.gzxkzgdDetail.evt_location_org==null?"":this.gzxkzgdDetail.evt_location_org,[Validators.required]],//组织
      uco_desc:[this.gzxkzgdDetail.uco_desc==null?"":this.gzxkzgdDetail.uco_desc,[Validators.required]],
      evt_status:[this.gzxkzgdDetail.evt_status==null?"":this.gzxkzgdDetail.evt_status,[Validators.required]],
      uco_desc2:[this.gzxkzgdDetail.uco_desc2==null?"":this.gzxkzgdDetail.uco_desc2,[Validators.required]],//许可证分类描述
      evt_standwork:[this.gzxkzgdDetail.evt_standwork==null?"":this.gzxkzgdDetail.evt_standwork,[Validators.required]],//许可证分类代码
      evt_udfchar01:[this.gzxkzgdDetail.evt_udfchar01==null?"":this.gzxkzgdDetail.evt_udfchar01,[Validators.required]],
      uco_desc3:[this.gzxkzgdDetail.uco_desc3==null?"":this.gzxkzgdDetail.uco_desc3,[Validators.required]],//风险等级描述
      evt_priority:[this.gzxkzgdDetail.evt_priority==null?"":this.gzxkzgdDetail.evt_priority,[Validators.required]],//风险等级代码
      evt_start:[this.gzxkzgdDetail.evt_start==null?"":this.gzxkzgdDetail.evt_start,[Validators.required]],
      evt_completed:[this.gzxkzgdDetail.evt_completed==null?"":this.gzxkzgdDetail.evt_completed,[Validators.required]],
      evt_udfchar30:[this.gzxkzgdDetail.evt_udfchar30==null?"":this.gzxkzgdDetail.evt_udfchar30,[Validators.required]],//供应商代码
      com_desc:[this.gzxkzgdDetail.com_desc==null?"":this.gzxkzgdDetail.com_desc,[Validators.required]],//供应商描述
      evt_workaddress:[this.gzxkzgdDetail.evt_workaddress==null?"":this.gzxkzgdDetail.evt_workaddress,[Validators.required]],
    })
  }

  backPage(){
    this.navCtrl.push(GongzuoxukezhengListPage)
  }

  //工单号
  getJobNumber(){
    let modal = this.modalCtrl.create(JobNumberPage,{
      evt_udfchar30:this.MessageForm.value.evt_udfchar30
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        this.MessageForm.controls['evt_parent'].setValue("")
      }else {
        if(data.com_code!=undefined){
          console.log(data.com_desc)
          this.MessageForm.controls['evt_parent'].setValue(data.com_code)
        }
      }
    });
    modal.present();
  }

  //获取油站名称
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

  //获取检查人
  getExminer(){
    let modal = this.modalCtrl.create(ExaminerPage,{
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        console.log(data.com_code)
        this.MessageForm.controls['evt_person'].setValue("");
        this.MessageForm.controls['per_descperson'].setValue("");
      }else {
        if(data.com_code!=undefined){
          this.MessageForm.controls['evt_person'].setValue(data.com_code);
          this.MessageForm.controls['per_descperson'].setValue(data.com_desc);
        }
      }
    });
    modal.present();
  }

  //获取许可证分类
  getLicenseCategory(){
    let modal = this.modalCtrl.create(LicenseCategoryPage,{
    });
    modal.onDidDismiss(data=>{
      if(data=='无'){
        this.MessageForm.controls['uco_desc2'].setValue("")
        this.MessageForm.controls['evt_standwork'].setValue("")
      }else {
        if(data.com_code!=undefined){
          this.MessageForm.controls['uco_desc2'].setValue(data.com_desc)
          this.MessageForm.controls['evt_standwork'].setValue(data.com_code)
        }
      }

    });
    modal.present();
  }
  //获取风险等级
  getRisk(){
    let modal = this.modalCtrl.create(RiskPriorityPage,{
      key:"2",
      title:"风险等级"
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

  openTime(key){
    this.nativeService.datePickers().subscribe(date=>{
      if(key=='evt_start'){
        this.MessageForm.controls['evt_start'].setValue(date)
      }
    })
  }

  //获取下一步状态按钮
  statusButton:any=[];
  nextStatus(){
    this.storage.get("username").then((username)=>{
      var url = this.httpService.url + "/appEvent/evtnexttype?evtstatus="+this.gzxkzgdDetail.evt_status+"&username="+username;
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.statusButton = data['result']
        console.log(this.statusButton)
        for(let i=0;i<this.statusButton.length;i++){
          this.buttons.push({text:this.statusButton[i].autstatnewdesc,handler:()=>{this.updatexkz('updateStatus',this.statusButton[i].aut_statnew)}})
        }
        this.buttons.push({text: '取消',role: 'cancel'})
        if(this.gzxkzgdDetail.evt_rstatus=='C'||this.buttons.length==1){
          this.temp=true
        }
      })
    })
  }

  //备注
  temp:boolean=false;
  BeizhuClick(index){
    if(index==1){
      this.temp = true
    }else {
      this.temp = false
    }
  }
  //更新
  updatexkz(key,aut_status){
    //非空判断
    if(this.MessageForm.value.des_text==null||this.MessageForm.value.des_text==""
      ||this.MessageForm.value.evt_parent==null||this.MessageForm.value.evt_parent==""
      ||this.MessageForm.value.evt_desc==null||this.MessageForm.value.evt_desc==""
      ||this.MessageForm.value.uco_desc2==null||this.MessageForm.value.uco_desc2==""
      ||this.MessageForm.value.evt_udfchar01==null||this.MessageForm.value.evt_udfchar01==""
      ||this.MessageForm.value.uco_desc3==null||this.MessageForm.value.uco_desc3==""
      ||this.MessageForm.value.com_desc==null||this.MessageForm.value.com_desc==""
      ||this.MessageForm.value.evt_workaddress==null||this.MessageForm.value.evt_workaddress==""
      ||this.MessageForm.value.per_descperson==null||this.MessageForm.value.per_descperson==""){
      this.nativeService.showToast("请填写*号部分")
    }else {
      var start = new Date().valueOf();//当前时间
      var evt_start = new Date(this.MessageForm.value.evt_start).valueOf();
      if(evt_start>start){
        this.nativeService.showToast("开始时间必须早于或等于当前日期/时间")
      }else {
        //更新数据
        var url = this.httpService.url + "/appEvent/updatetotalevtxkz";
        let body = "evt_code="+this.MessageForm.value.evt_code+"&evt_parent="+this.MessageForm.value.evt_parent
          +"&evt_desc="+this.MessageForm.value.evt_desc+"&evt_location="+this.MessageForm.value.evt_location
          +"&evt_standwork="+this.MessageForm.value.evt_standwork
          +"&evt_udfchar01="+this.MessageForm.value.evt_udfchar01+"&evt_priority="+this.MessageForm.value.evt_priority
          +"&evt_start="+this.MessageForm.value.evt_start+"&evt_udfchar30="+this.MessageForm.value.evt_udfchar30
          +"&evt_workaddress="+this.MessageForm.value.evt_workaddress+"&evt_location_org="+this.MessageForm.value.evt_location_org
          +"&evt_person="+this.MessageForm.value.evt_person+"&evt_updatedby="+this.username;

        console.log(body)
        this.httpService.post(url,body).subscribe((res)=>{
          let datas = res.json();
          if(datas['resultCode']==1){
            if(key=='updateStatus'){//状态更新
              this.updateStatus(aut_status);
            }else {
              this.nativeService.showToast(datas['message'])
              this.goGongzuoxukezheng()
            }
          }else {
            this.nativeService.showToast(datas['message'])
          }
        })
      }
    }
  }
  //状态更新
  updateStatus(aut_status){
    //手写签名
    let modal = this.modalCtrl.create(HandwrittenSignature,{
      evt_code:this.gzxkzgdDetail.evt_code,
      evt_statu:this.gzxkzgdDetail.evt_status
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
                //this.navCtrl.push(GongzuoxukezhengListPage)
                this.goGongzuoxukezheng();
              }else {
                this.nativeService.showToast(data['message'])
              }
            })
          }else {
            this.goGongzuoxukezheng()
          }
        })
        modals.present();
      }else {
        this.goGongzuoxukezheng()
      }
    });
    modal.present();
  }

  //获取详细信息
  goGongzuoxukezheng(){
    var url = this.httpService.url + "/appEvent/evtpmwhdetail?evt_code="+this.gzxkzgdDetail.evt_code;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.storage.set("gzxkzgdDetail",data['result']);
      this.storage.set("imageDate",data['r5rmDocs']);
      this.storage.set("XKZOpinion",data['adDetails']);//存储审批意见
      this.navCtrl.push(GongzuoxukezhengPage,{
        gzxkzgdDetail:data['result']
      })
    })
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
    this.nextStatus();
    console.log('ionViewDidLoad GongzuoxukezhengMessagePage');
  }
  ionViewDidEnter(){//进入了一个页面且变成了当前的激活页面，该事件不管是第一次进入还是缓存后进入都将执行。

  }

}
