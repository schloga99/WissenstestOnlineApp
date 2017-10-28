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
    constructor(public navCtrl: NavController, private globalvar: GlobalVars) {
        this.currfeuerwehr = "";
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
}