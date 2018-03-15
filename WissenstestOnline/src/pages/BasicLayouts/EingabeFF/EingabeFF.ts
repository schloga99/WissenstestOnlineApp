import { Component, OnInit } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AuswahlStufePage } from "../AuswahlStufe/AuswahlStufe";
import { GlobalVars } from "../../../providers/globals";
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { database } from '../../../providers/database';

@Component({
  selector: 'page-EingabeFF',
  templateUrl: 'EingabeFF.html'
})
export class EingabeFFPage implements OnInit {
  currbezirk: string;
  currfeuerwehr: string;
  bezirke: any;
  FFbezirk: any = [];
  standorte: any;

  constructor(public navCtrl: NavController, private globalvar: GlobalVars,public alertController: AlertController, public database: database) {

  }
  ngOnInit() {
    this.currfeuerwehr = "";
    this.currbezirk = "";

    this.bezirke = this.database.getBezirk();
    this.bezirke.sort();
    this.standorte = this.database.getStandorte();
  }

  onLink(url: string) {
    window.open(url);
  }

  weiterbtn() {
    console.log(this.currfeuerwehr + " = currentfeuerwehr");
    if ((typeof this.currfeuerwehr != 'object') && (this.currfeuerwehr != "")) {
      this.globalvar.setfeuerwehrandbezirk(this.currfeuerwehr, this.currbezirk);
      this.navCtrl.push(AuswahlStufePage);

    } else {
      let alert = this.alertController.create({
        title: "Warnung",
        message: "Sie müssen eine Feuerwehr auswählen!",
        buttons: ['zurück']
      });
      alert.present();
    }
  }
  data = [];
  count: number = 0;
  count2: number = 0;
  onchangeFF() {
    console.log(this.currbezirk + " ist der ausgewählte currbezirk");
    this.currfeuerwehr = "";
    this.FFbezirk = [];
    for (var i of this.standorte) {
      if (this.bezirke[this.count2] == this.currbezirk) {
        for (var j of i) {
          this.FFbezirk[this.count] = j;
          this.count++;
        }
      }
      this.count2++;
    }
    this.count = 0;
    this.count2 = 0;

    this.FFbezirk.sort();
  }
}
