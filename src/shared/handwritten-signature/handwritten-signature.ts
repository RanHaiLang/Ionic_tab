import {Component, Input, ElementRef, ViewChild} from "@angular/core";
import {NavParams, NavController, ViewController} from "ionic-angular";
import {SignaturePad} from "angular2-signaturepad/signature-pad";
import {FileService} from "../../prodivers/fileService";
import {FileObj} from "../../model/FileObj";
import {HttpService} from "../../prodivers/httpService";
import {NativeService} from "../../prodivers/nativeService";
@Component({
  selector:'page-handwritten-signature',
  templateUrl:'handwritten-signature.html'
})
export class HandwrittenSignature{

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @ViewChild('contentEl') contentEl: ElementRef;

  imageData: string;
  isEmpty = true;

  @Input()
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasHeight': 200,
    /*'penColor': "rgb(66, 133, 244)",*/
    'backgroundColor':'white'
  };

  evt_code:string;
  evt_statu:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,
              public fileService:FileService,public httpService:HttpService,public nativeService:NativeService) {
    this.evt_code = this.navParams.get('evt_code');
    this.evt_statu = this.navParams.get('evt_statu');
  }

  ionViewDidLoad() {
    this.signaturePad.set('canvasWidth', this.contentEl.nativeElement.offsetWidth); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    console.log('ionViewDidLoad SampleSignaturepadPage');
  }

  dismiss(){
    this.viewCtrl.dismiss(0);
  }
  drawStart() {
    console.log('begin drawing');
  }

  drawComplete() {
    console.log("end")
    this.isEmpty = true;
  }

  filePaths: FileObj;
  save() {
    this.imageData = this.signaturePad.toDataURL();
    //this.imageData = this.imageData.substring(this.imageData.lastIndexOf(',')+1);
    var url = this.httpService.url+"/appEvent/evtuploadqm2";
    let body = "evt_code="+this.evt_code+"&evt_status="+this.evt_statu+"&basestr="+this.imageData;
    this.httpService.post(url,body).subscribe((res)=>{
      res=res.json();
      console.log(res)
      if(res['resultCode']==1){
        this.viewCtrl.dismiss(1)
      }else {
        this.nativeService.showToast(res['message']);
      }
    })
  }

  empty() {
    this.signaturePad.clear();
  }
}
