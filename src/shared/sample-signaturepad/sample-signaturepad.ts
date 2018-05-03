import {Component, ElementRef, ViewChild, Input} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignaturePad} from "angular2-signaturepad/signature-pad";

/**
 * Generated class for the SampleSignaturepadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-sample-signaturepad',
  templateUrl: 'sample-signaturepad.html',
})
export class SampleSignaturepadPage {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @ViewChild('contentEl') contentEl: ElementRef;

  imageData: String;
  isEmpty = true;

  @Input()
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasHeight': 200
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.signaturePad.set('canvasWidth', this.contentEl.nativeElement.offsetWidth); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    console.log('ionViewDidLoad SampleSignaturepadPage');
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log("end")
    this.isEmpty = true;
  }

  save() {
    this.imageData = this.signaturePad.toDataURL();
  }

  empty() {
    this.signaturePad.clear();
  }

}
