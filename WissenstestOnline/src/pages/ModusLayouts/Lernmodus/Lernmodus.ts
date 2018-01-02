import { Component } from '@angular/core';
import { GlobalVars } from "../../../providers/globals";
import { NavController } from 'ionic-angular';
import { AuswahlStationPage } from '../../BasicLayouts/AuswahlStation/AuswahlStation'
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-Lernmodus',
    templateUrl: 'Lernmodus.html'
})
export class LernmodusPage {
    Frage: any;
    ausgewähltestations: any;
    aktstation: any;
    aktstufe: any;
    stufeoutput: any;
    aktFF: any;
    fragenr: number;

    hideantwort: any;
    hidecheckbox: any;
    hideradio: any;
    hidelabel: any;
    hidedate: any;
    hideslider: any;
    slidervalue: number;
    data = [];
    constructor(public navCtrl: NavController, public globalvar: GlobalVars, public storage: Storage, public alertController: AlertController) {
        this.aktstation = "";
        this.slidervalue = 0;
        this.aktFF = this.globalvar.getfeuerwehr();

        this.storage.ready().then(() => {
            this.storage.get('Fragen').then((val) => { // retrive           
                
                this.data = val || []; 
                this.Frage = this.data[0][1];
                console.log("erste Frage gesetzt");
            })
        });
        this.storage.ready().then(() => {
            this.storage.get('Zusatzinfo').then((val) => { // retrive                                           
                console.log(val);
                this.testinfo = val[0];
                console.log(this.testinfo);
            })
        });
        
        this.aktstufe = this.globalvar.getaktlstufe();
        if (this.aktstufe == 1) {
            this.stufeoutput = "Bronze";
        }
        if (this.aktstufe == 2) {
            this.stufeoutput = "Silber";
        }
        if (this.aktstufe == 3) {
            this.stufeoutput = "Gold";
        }
        this.ausgewähltestations = this.globalvar.getstationen();
        this.fragenr = 0;
        this.setAntworttext(this.fragenr);
        this.aktstation = this.ausgewähltestations[0];


        this.testeinstellungen();
    }

    onLink(url: string) {
        window.open(url);
    }

    abbruchbtn() {

        this.navCtrl.push(AuswahlStationPage);
    }
    testinfo: any;
    zusatzinfobutton() {
        
        let alert = this.alertController.create({
            title: "Zusatzinfo",
            message: this.testinfo,
            buttons: ['zurück']
        });
        alert.present();

    }
    nextbtn() {

    }
    lastbtn() {

    }
   
    Antwort1: any; 
    Antwort2: any; 
    Antwort3: any; 
    Antwort4: any; 
    setAntworttext(aktfrageNr: number) {
        this.storage.ready().then(() => {
            this.storage.get('Antworten').then((val) => { // retrive                                           
                console.log(val);

                if (aktfrageNr == val[0][0]) {
                    this.fragenr = 1;
                    console.log("AktuelleFrageAntwortNummer = "+ aktfrageNr);
                    console.log("Frage: "+this.fragenr);
                    this.Antwort1 = val[0][1];
                    //this.Antwort2 = val[0][2];
                    //this.Antwort3 = val[0][3];
                    //this.Antwort4 = val[0][4];
                    console.log("Antwort gesetzt");
                    
                }
            })
        });
    }


    testeinstellungen() {
        this.stufeoutput = "Bronze";
        this.aktFF = "Eggerding";
        this.aktstation = "Allgemeinwissen";
    }
}