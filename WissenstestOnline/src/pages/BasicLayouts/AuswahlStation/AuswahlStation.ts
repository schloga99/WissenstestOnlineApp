import { Component } from '@angular/core';
import { GlobalVars } from "../../../providers/globals";
import { NavController } from 'ionic-angular';
import { AuswahlStufePage } from "../AuswahlStufe/AuswahlStufe";

@Component({
    selector: 'page-AuswahlStation',
    templateUrl: 'AuswahlStation.html'
})
export class AuswahlStationPage {
    stations: any;
    
    stufe: any;
    stufeoutput: any;
    aktFF: any;

    checkedradiobutton: any;
    constructor(public navCtrl: NavController, private globalvar: GlobalVars) {
        this.checkedradiobutton = "";
        this.stufeoutput = "";
        this.aktFF = this.globalvar.getfeuerwehr();
        this.stufe = this.globalvar.getaktlstufe();
        if (this.stufe == 1)
        {
            this.stufeoutput = "Bronze";
        }
        if (this.stufe == 2) {
            this.stufeoutput = "Silber";
        }
        if (this.stufe == 3) {
            this.stufeoutput = "Gold";
        }
    }

    onLink(url: string) {
        window.open(url);
    }

    mcqAnswer(value) {
        if (value == 1)
        {
            this.checkedradiobutton = "learn";
        }
        if (value == 2) {
            this.checkedradiobutton = "practise";
        }
    }

    startbtn() {
        if (this.checkedradiobutton == "learn") {
            console.log("lernmodus");
        }
        if (this.checkedradiobutton == "practise") {
            console.log("Übungsmodus");
        }


        //if (this.stufe != -1) //noch falsch, muss überprüft mit feuerwehr werden
        //{

        //    this.globalvar.setstufe(this.stufe);
        //    this.navCtrl.push(AuswahlStationPage);

        //} else {

        //}
    }
    backbtn() {

        //this.globalvar.setstufe(-1);
        //this.navCtrl.push(EingabeFFPage);
        this.navCtrl.push(AuswahlStufePage);
    }
}