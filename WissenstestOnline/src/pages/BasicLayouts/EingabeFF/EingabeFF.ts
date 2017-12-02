import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AuswahlStufePage } from "../AuswahlStufe/AuswahlStufe";
import { GlobalVars } from "../../../providers/globals";

@Component({
    selector: 'page-EingabeFF',
    templateUrl: 'EingabeFF.html'
})
export class EingabeFFPage {
    currbezirk: string;
    currfeuerwehr: string;
    bezirke: any;
    FFbezirk: any;

    constructor(public navCtrl: NavController, private globalvar: GlobalVars) {
        this.currfeuerwehr = "";
        this.currbezirk = "";
        this.bezirke = [
            'Grieskirchen',
            'Braunau am Inn',
            'Eferding',
            'Freistadt',
            'Gmunden',
            'Kirchdorf an der Krems',
            'Linz-Land',
            'Perg',
            'Ried im Innkreis',
            'Rohrbach',
            'Schärding',
            'Steyr-Land',
            'Urfahr-Umgebung',
            'Vöcklabruck',
            'Wels-Land',
        ];
        this.FFbezirk = [
            'Grieskirchen',
            'Braunau am Inn',
            'Eferding',
            'Freistadt',
            'Gmunden',
            'Kirchdorf an der Krems',
            'Linz-Land',
            'Perg',
            'Ried im Innkreis',
            'Rohrbach',
            'Schärding',
            'Steyr-Land',
            'Urfahr-Umgebung',
            'Vöcklabruck',
            'Wels-Land',
        ];
       
    }

    onLink(url: string) {
        window.open(url);
    }
    weiterbtn() {
        console.log(this.currfeuerwehr);
        if (this.currfeuerwehr != "") //noch falsch, muss überprüft mit feuerwehr werden
        {
            
            this.globalvar.setfeuerwehrandbezirk(this.currfeuerwehr, this.currbezirk);
            this.navCtrl.push(AuswahlStufePage);

        } else {

        }
    }

    onchangeFF() {
        console.log(this.currbezirk +"= ausgewähter currbezirk");
        switch (this.currbezirk)
        {
            case this.bezirke[0]:
                this.FFbezirk = ['Natternbach', 'Prambachkirchen',];
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