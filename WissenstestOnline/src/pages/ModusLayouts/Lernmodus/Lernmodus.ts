import { Component, OnInit } from '@angular/core';
import { GlobalVars } from "../../../providers/globals";
import { NavController } from 'ionic-angular';
import { AuswahlStationPage } from '../../BasicLayouts/AuswahlStation/AuswahlStation'
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { ZusatzinfoPage } from '../Modalzusatzinfo/zusatzinfo'
import { database } from '../../../providers/database';
import { Aufgabe } from './Aufgabe';

@Component({
  selector: 'page-Lernmodus',
  templateUrl: 'Lernmodus.html'
})
export class LernmodusPage {
  Fragetext: any;
  Fragebild: any;
  Fragevideo: any;
  Antworttext: any;
  Antwortbild: any;
  Antwortvideo: any;

  Zusatzinfos: any;
  

  ausgewähltestations: any;
  aktstation: any;
  aktstufe: any;
  stufeoutput: any;
  aktFF: any;
  fragenr: number;

  hideantwort: boolean =false;
  hidetext: boolean = true;
  hidecheckbox: boolean = false;
  hideradio: boolean = false;
  hidelabel: boolean = false;
  hidedate: boolean = false;
  hideslider: boolean = false;

  slidervalue: number;

  
  data = [];
  Aufgabedata: Aufgabe[] = [];
  Fragedata = [];
  Typendefinition = [];
  
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public globalvar: GlobalVars, public storage: Storage, public alertController: AlertController, public database: database) { }

  ngOnInit() {
    this.aktstation = "";
    this.slidervalue = 0;
    this.aktFF = this.globalvar.getfeuerwehr();

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
    console.log(this.ausgewähltestations);
    this.fragenr = 0;
    this.setAntworttext(this.fragenr);

    this.aktstation = this.ausgewähltestations[0];

    console.log(this.aktstation);


    //testeinstellungen
      //this.aktFF = "Natternbach"
      //this.aktstation = "Allgemeinwissen";
      //this.aktstufe = "1";

    //bekomme hier alle beötigte Daten
    this.data = this.database.ALLDATA;
    this.Fragedata = this.database.frageobject;
    this.Aufgabedata = this.database.getausgewählteAufgaben();
    console.log(this.Aufgabedata);

    //setze hier erste Frage:
    let Aufgabe0 = this.Aufgabedata[0];
    console.log(this.Aufgabedata[0]);

    let Frage0 = Aufgabe0.Frage;
    console.log(Aufgabe0.Frage);
    this.Fragetext = this.Fragedata[Frage0].Fragetext;
    this.Fragebild = this.Fragedata[Frage0].Fragebild;
    this.Fragevideo = this.Fragedata[Frage0].Fragevideo;
    console.log(this.Fragetext);
    
    

  }

  onLink(url: string) {
    window.open(url);
  }

  abbruchbtn() {

    this.navCtrl.push(AuswahlStationPage);
  }

  testinfo: any = "Funktioniert";
  zusatzinfobutton() {

    let zusatzinfomodal = this.modalCtrl.create(ZusatzinfoPage, { info: this.testinfo });
    zusatzinfomodal.present();

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
    //this.storage.ready().then(() => {
    //    this.storage.get('Antworten').then((val) => { // retrive                                           
    //        console.log(val);

    //        if (aktfrageNr == val[0][0]) {
    //            this.fragenr = 1;
    //            console.log("AktuelleFrageAntwortNummer = "+ aktfrageNr);
    //            console.log("Frage: "+this.fragenr);
    //            this.Antwort1 = val[0][1];
    //            //this.Antwort2 = val[0][2];
    //            //this.Antwort3 = val[0][3];
    //            //this.Antwort4 = val[0][4];
    //            console.log("Antwort gesetzt");

    //        }
    //    })
    //});






  }
};




