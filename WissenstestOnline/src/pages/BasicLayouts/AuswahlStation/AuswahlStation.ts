import { Component } from '@angular/core';
import { GlobalVars } from "../../../providers/globals";
import { NavController } from 'ionic-angular';
import { AuswahlStufePage } from "../AuswahlStufe/AuswahlStufe";
import { LernmodusPage } from "../../ModusLayouts/Lernmodus/Lernmodus";
import { ÜbungsmodusPage } from "../../ModusLayouts/Übungsmodus/Übungsmodus";
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-AuswahlStation',
    templateUrl: 'AuswahlStation.html'
})
export class AuswahlStationPage {
    stations: any; //angezeigte Stationen
    stufe: any;
    stufeoutput: any;
    aktFF: any;
    checkedradiobutton: any;
    ausgewaelteStationen: any; //ausgewähltestationen

    constructor(public navCtrl: NavController, private globalvar: GlobalVars, public storage: Storage) {
        this.checkedradiobutton = "";
        this.stufeoutput = "";
        this.aktFF = this.globalvar.getfeuerwehr();
        this.stufe = this.globalvar.getaktlstufe();
        if (this.stufe == 1) {
            this.stufeoutput = "Bronze";
        }
        if (this.stufe == 2) {
            this.stufeoutput = "Silber";
        }
        if (this.stufe == 3) {
            this.stufeoutput = "Gold";
        }
        this.storage.ready().then(() => {
            this.storage.get('Stations').then((val) => { // retrive           
                this.stations = val;
                console.log(this.stations);
                console.log("alle Stationen gespeichert");
            })
        });
        
    }

    onLink(url: string) {
        window.open(url);
    }

    modeAnswer(value) {
        if (value == 1) {
            this.checkedradiobutton = "learn";
        }
        if (value == 2) {
            this.checkedradiobutton = "practise";
        }
    }

    startbtn() {
        console.log(this.ausgewaelteStationen);
        if (this.checkedradiobutton == "learn" && this.ausgewaelteStationen != null) {
            console.log("lernmodus");
            this.globalvar.setstationen(this.ausgewaelteStationen);
            this.navCtrl.push(LernmodusPage);
        }
        if (this.checkedradiobutton == "practise" && this.ausgewaelteStationen != null) {
            console.log("Übungsmodus");
            this.globalvar.setstationen(this.ausgewaelteStationen);
            this.navCtrl.push(ÜbungsmodusPage);
        }
    }
    backbtn() {
        this.navCtrl.push(AuswahlStufePage);
    }
}