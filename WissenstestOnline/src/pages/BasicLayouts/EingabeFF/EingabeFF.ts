import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AuswahlStufePage } from "../AuswahlStufe/AuswahlStufe";
import { GlobalVars } from "../../../providers/globals";
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-EingabeFF',
    templateUrl: 'EingabeFF.html'
})
export class EingabeFFPage {
    currbezirk: string;
    currfeuerwehr: string;
    bezirke: any;
    FFbezirk: any;

    constructor(public navCtrl: NavController, private globalvar: GlobalVars, public storage: Storage) {
        this.currfeuerwehr = "";
        this.currbezirk = "";

        this.storage.get('Bezirk').then((val) => { // retrive           
            this.bezirke = val;
        })
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
            console.log("hier muss noch Meldung sein (Sie müssen eine Feuerwehr angeben");
        }
    }
    data = [];
    onchangeFF() {
        console.log(this.currbezirk + " ist der ausgewählte currbezirk");
        this.currfeuerwehr = "";
        switch (this.currbezirk) {
            case this.bezirke[0]:           
                this.storage.get('Bezirk0FF').then((val) => { // retrive                              
                    this.data = val || [];
                    console.log(this.data);
                    if (this.FFbezirk != null) {
                        this.FFbezirk.splice(0, this.FFbezirk.length);
                    }    
                    this.FFbezirk = this.data;
                })
                break;
            case this.bezirke[1]:
                this.FFbezirk = [
                    'Grieskirchen',
                ];
                break;
            case this.bezirke[2]:
                this.FFbezirk = [
                    'Grieskirchen',
                    'Braunau am Inn',
                ];
                break;
            case this.bezirke[3]:
                this.storage.get('Bezirk').then((val) => { // retrive
                    console.log('Your Bezirk is', val);
                    this.data = val || [];
                    if (this.FFbezirk != null)
                    {
                        this.FFbezirk.splice(0, this.FFbezirk.length);
                    }                    
                    this.FFbezirk = this.data;
                })
                break;
            case this.bezirke[4]:
                break;
            case this.bezirke[5]:
                break;
            case this.bezirke[6]:
                break;
            case this.bezirke[7]:
                break;
            case this.bezirke[8]:
                break;
            case this.bezirke[9]:
                break;
            case this.bezirke[10]:
                break;
            case this.bezirke[11]:
                break;
            case this.bezirke[12]:
                break;
            case this.bezirke[13]:
                break;
            case this.bezirke[14]:
                break;

        }
    }
}