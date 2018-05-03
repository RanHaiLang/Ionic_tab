import {Component, ChangeDetectorRef} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, ActionSheetController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {XunzhangongdanListPage} from "../../xunzhangongdan-list";
import {DomSanitizer} from "@angular/platform-browser";
import {NativeService} from "../../../../prodivers/nativeService";
import {HttpService} from "../../../../prodivers/httpService";
import {FileObj} from "../../../../model/FileObj";
import {Storage} from "@ionic/storage";
import {HandwrittenSignature} from "../../../../shared/handwritten-signature/handwritten-signature";
import {OpinionPage} from "../../../../shared/opinion/opinion";
import {XunzhangongdanPage} from "../xunzhangongdan";

/**
 * Generated class for the GongdanMessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xunzhangongdan-message',
  templateUrl: 'gongdan-message.html',
})
export class GongdanMessagePage {
  MessageForm:any=[];
  xzgdDetail:any=[];
  xzgdImageDate:any=[];
  XZOpinion:any=[];
  username:string="";

  fileObjList: FileObj[] = [];
  filePaths: FileObj[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder:FormBuilder,private sanitizer: DomSanitizer,
              public nativeService:NativeService,public httpService:HttpService,
              public cd: ChangeDetectorRef,public storage:Storage,public modalCtrl:ModalController,
              private actionSheetCtrl: ActionSheetController) {
    this.xzgdDetail =  this.navParams.get("xzgdDetail");

    /**********************图片上传时用到*******************************/
    this.storage.set("evt_code",this.xzgdDetail.evt_code);//存储evt_code，用于上传图片
    this.storage.set("ImgUploadUrl",'evtuploadqm');
    /**********************end*******************************/


    this.storage.get("xzgdImageDate").then((res)=>{//获取图片路径
      this.xzgdImageDate = res;
      //给图片的数组是复制
      for(var i=0;i<this.xzgdImageDate.length;i++){
        var suffix = this.xzgdImageDate[i].doc_filename.substring(this.xzgdImageDate[i].doc_filename.lastIndexOf(".")+1);
        let fileObj = <FileObj>{'id':this.xzgdImageDate[i].doc_code,'origPath': this.xzgdImageDate[i].doc_filename, 'thumbPath': this.xzgdImageDate[i].doc_filename, 'suffix':suffix};
        this.filePaths.push(fileObj);
      }
    })
    this.storage.get("username").then((res)=>{
      this.username=res;
    })
    this.storage.get("XZOpinion").then((res)=>{
      this.XZOpinion = res;
    })
    this.MessageForm = this.formBuilder.group({
      evt_code:[this.xzgdDetail.evt_code==null?"":this.xzgdDetail.evt_code,[Validators.required]],
      evt_desc:[this.xzgdDetail.evt_desc==null?"":this.xzgdDetail.evt_desc,[Validators.required]],
      des_text:[this.xzgdDetail.des_text==null?"":this.xzgdDetail.des_text,[Validators.required]],
      evt_status:[this.xzgdDetail.evt_status==null?"":this.xzgdDetail.evt_status,[Validators.required]],
      uco_desc:[this.xzgdDetail.uco_desc==null?"":this.xzgdDetail.uco_desc,[Validators.required]],
      uco_desc2:[this.xzgdDetail.uco_desc2==null?"":this.xzgdDetail.uco_desc2,[Validators.required]],
      evt_udfchar30:[this.xzgdDetail.evt_udfchar30==null?"":this.xzgdDetail.evt_udfchar30,[Validators.required]],
      evt_target:[this.xzgdDetail.evt_target==null?"":this.xzgdDetail.evt_target,[Validators.required]],
      evt_schedend:[this.xzgdDetail.evt_schedend==null?"":this.xzgdDetail.evt_schedend,[Validators.required]],
      evt_start:[this.xzgdDetail.evt_start==null?"":this.xzgdDetail.evt_start,[Validators.required]],
      completed:[this.xzgdDetail.completed==null?"":this.xzgdDetail.completed,[Validators.required]],
      evt_udfnum01:[this.xzgdDetail.evt_udfnum01==null?"":this.xzgdDetail.evt_udfnum01,[Validators.required]],
    })
  }

  backPage(){
    this.navCtrl.push(XunzhangongdanListPage)
  }

  openTime(key){
    this.nativeService.datePickerss().subscribe(date=>{
      console.log(date);
      if(key=='evt_target'){
        this.MessageForm.controls['evt_target'].setValue(date)
      }else if(key=='evt_schedend'){
        this.MessageForm.controls['evt_schedend'].setValue(date)
      }
    })
  }
  //进度条
  jinduHTML(){
    return this.sanitizer.bypassSecurityTrustHtml('<div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:'+this.xzgdDetail.evt_udfnum01+'%"></div>');
  }

  //获取下一步状态按钮
  statusButton:any=[];
  nextStatus(){
    this.storage.get("username").then((username)=>{
      var url = this.httpService.url + "/appEvent/evtnexttype?evtstatus="+this.xzgdDetail.evt_status+"&username="+username;
      this.httpService.get(url).subscribe((res)=>{
        let data = res.json();
        this.statusButton = data['result']
        console.log(this.statusButton)

        for(let i=0;i<this.statusButton.length;i++){
          this.buttons.push({text:this.statusButton[i].autstatnewdesc,handler:()=>{this.saveMessage('updateStatus',this.statusButton[i].aut_statnew)}})
        }
        this.buttons.push({text: '取消',role: 'cancel'})
        if(this.xzgdDetail.evt_rstatus=='C'||this.buttons.length==1){
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
  //保存数据
  saveMessage(key,aut_status){
    if(this.MessageForm.value.evt_target==null||this.MessageForm.value.evt_target==""||
      this.MessageForm.value.evt_schedend==null||this.MessageForm.value.evt_schedend==""){
      this.nativeService.showToast("请填写*号部分")
    }else {
      var evt_target = new Date(this.MessageForm.value.evt_target).valueOf();
      var evt_schedend = new Date(this.MessageForm.value.evt_schedend).valueOf();
      var evt_created = new Date(this.MessageForm.value.evt_created).valueOf();//工单创建时间

      if(evt_created>evt_target){
        this.nativeService.showToast("计划开始日期必须晚于工单创建日期")
      }else {
        if(evt_target>evt_schedend){
          this.nativeService.showToast("计划开始日期必须早于计划结束日期")
        }else {
          var url = this.httpService.url + "/appEvent/updatetotalevt";
          let body = "evt_code="+this.MessageForm.value.evt_code+"&evt_target="+this.MessageForm.value.evt_target
            +"&evt_schedend="+this.MessageForm.value.evt_schedend+"&evt_updatedby="+this.username;
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
  //状态更新
  updateStatus(aut_status){
    //手写签名
    let modal = this.modalCtrl.create(HandwrittenSignature,{
      evt_code:this.xzgdDetail.evt_code,
      evt_statu:this.xzgdDetail.evt_status
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
                //this.navCtrl.push(XunzhangongdanListPage)
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

  getDetail(){
    //获取详细信息
    var url = this.httpService.url + "/appEvent/evtpmwhdetail?evt_code="+this.xzgdDetail.evt_code;
    this.httpService.get(url).subscribe((res)=>{
      let data = res.json();
      this.storage.set("xzgdDetail",data['result']);
      this.storage.set("xzgdImageDate",data['r5rmDocs']);
      this.storage.set("XZOpinion",data['adDetails']);//存储审批意见
      this.navCtrl.push(XunzhangongdanPage,{
        xzgdDetail:data['result'],
        //xzgdImageDate:data['r5rmDocs']
      })
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GongdanMessagePage');
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
