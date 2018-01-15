import { Component, OnInit } from '@angular/core';
import { GlobalVars } from "../../../providers/globals";
import { NavController } from 'ionic-angular';
import { AuswahlStufePage } from "../AuswahlStufe/AuswahlStufe";
import { LernmodusPage } from "../../ModusLayouts/Lernmodus/Lernmodus";
import { ÜbungsmodusPage } from "../../ModusLayouts/Übungsmodus/Übungsmodus";
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-AuswahlStation',
    templateUrl: 'AuswahlStation.html'
})
export class AuswahlStationPage implements OnInit {

    constructor(public navCtrl: NavController, private globalvar: GlobalVars, public storage: Storage, public alertController: AlertController) { }

    stations = [
        'Allgemeinwissen',
        'Dienstgrade',
        'Wasserführende Armaturen + technische Geräte',
        'Vorbeugender Brandschutz',
        'Seilknoten',
        'Nachrichtenübermittlung',
        'Verkehrserziehung und Absichern von Einsatzstellen',
        'Erste Hilfe',
        'Taktik',
        'Gefährliche Stoffe',
        'Atem- und Körperschutz',
    ]; 

    stufe: any;
    stufeoutput: any;
    aktFF: any;
    checkedradiobutton: any;
    ausgewaelteStationen: any; //ausgewähltestationen

    ngOnInit() {
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
        else if (this.checkedradiobutton == "practise" && this.ausgewaelteStationen != null) {
            console.log("Übungsmodus");
            this.globalvar.setstationen(this.ausgewaelteStationen);
            this.navCtrl.push(ÜbungsmodusPage);
        }
        else {
            let alert = this.alertController.create({

                title: "Warnung",
                message: "Sie müssen eine Station und einen Modus auswählen!",
                buttons: ['zurück']
            });
            alert.present();
        }
    }
    backbtn() {
        this.navCtrl.push(AuswahlStufePage);
    }
}