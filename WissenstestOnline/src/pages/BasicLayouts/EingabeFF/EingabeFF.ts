﻿import { Component, OnInit } from '@angular/core';
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

    constructor(public navCtrl: NavController, private globalvar: GlobalVars, public storage: Storage, public alertController: AlertController, public database: database) {
        
    }
    ngOnInit() {
        this.currfeuerwehr = "";
        this.currbezirk = "";

        //this.storage.ready().then(() => {
        //    this.storage.get('Bezirk').then((val) => { // retrive               
        //        this.bezirke = val;
        //        console.log(this.bezirke);
        //    });
        //});
        this.bezirke = this.database.getBezirk();
        this.standorte = this.database.getStandorte();
    }

    onLink(url: string) {
        window.open(url);
    }

    weiterbtn() {
        console.log(this.currfeuerwehr + " = currentfeuerwehr");
        if ((typeof this.currfeuerwehr != 'object') && (this.currfeuerwehr != "")) {        //if ( (this.currfeuerwehr != "") && (this.currfeuerwehr.length != 0) && (this.currfeuerwehr != null) && (typeof this.currfeuerwehr != 'object'))
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
                    console.log(this.bezirke[this.count2]);
                    this.FFbezirk[this.count] = j;
                    this.count++;
                }             
            }
            //this.FFbezirk[this.count] = i;
            this.count2++;
        }
        this.count = 0;
        this.count2 = 0;

        //switch (this.currbezirk) {
        //    case this.bezirke[0]:
        //        //this.storage.get('Bezirk0FF').then((val) => { // retrive                              
        //        //    this.data = val || [];                   
        //        //    console.log(this.data);
        //        //    if (this.FFbezirk != null) {
        //        //        this.FFbezirk.splice(0, this.FFbezirk.length);
        //        //    }    
        //        //    this.FFbezirk = this.data;
        //        //})
        //        //for (var i of this.standorte)
        //        //{                   
        //        //    console.log(this.count);
        //        //    this.FFbezirk[this.count] = i;
        //        //    this.count++;
        //        //}
        //        //this.count = 0;
        //        break;
        //    case this.bezirke[1]:
        //        this.FFbezirk = [
        //            'Grieskirchen',
        //        ];
        //        break;
        //    case this.bezirke[2]:
        //        this.FFbezirk = [
        //            'Grieskirchen',
        //            'Braunau am Inn',
        //        ];
        //        break;
        //    case this.bezirke[3]:
        //        this.storage.get('Bezirk').then((val) => { // retrive
        //            console.log('Your Bezirk is', val);
        //            this.data = val || [];
        //            if (this.FFbezirk != null) {
        //                this.FFbezirk.splice(0, this.FFbezirk.length);
        //            }
        //            this.FFbezirk = this.data;
        //        })
        //        break;
        //    case this.bezirke[4]:
        //        break;
        //    case this.bezirke[5]:
        //        break;
        //    case this.bezirke[6]:
        //        break;
        //    case this.bezirke[7]:
        //        break;
        //    case this.bezirke[8]:
        //        break;
        //    case this.bezirke[9]:
        //        break;
        //    case this.bezirke[10]:
        //        break;
        //    case this.bezirke[11]:
        //        break;
        //    case this.bezirke[12]:
        //        break;
        //    case this.bezirke[13]:
        //        break;
        //    case this.bezirke[14]:
        //        break;

        //}
    }
}