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

  hidetext: boolean = false;
  hidecheckbox: boolean = false;
  hideradio: boolean = false;
  //hidelabel: boolean = false;
  hidedate: boolean = false;
  hideslider: boolean = false;

  slidervalue: number;

  data = [];
  Aufgabedata: Aufgabe[] = [];
  Fragedata = [];
  Typendefinition = [];
  stations = [];
  zusatzinfo = [];
  infocontent = [];

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public globalvar: GlobalVars, public storage: Storage, public alertController: AlertController, public database: database) { }

  ngOnInit() {
    this.indexAufgabe = 0;
    this.aktstation = "";
    this.slidervalue = 0;
    this.aktFF = this.globalvar.getfeuerwehr();
    this.aktstufe = this.globalvar.getaktlstufe();
    this.ausgewähltestations = this.globalvar.getstationen();
    console.log(this.ausgewähltestations);
    this.fragenr = 0;

    console.log(this.aktstation);

    if (this.aktstufe == 1) {
      this.stufeoutput = "Bronze";
    }
    if (this.aktstufe == 2) {
      this.stufeoutput = "Silber";
    }
    if (this.aktstufe == 3) {
      this.stufeoutput = "Gold";
    }

    //bekomme hier alle benötigte Daten
    this.data = this.database.ALLDATA;
    this.Fragedata = this.database.frageobject;
    this.Aufgabedata = [];
    this.Aufgabedata = this.database.getausgewählteAufgaben();
    //console.log(this.database.getausgewählteAufgaben());
    this.Aufgabedata.sort((s1, s2) => {
      if (s1.Station > s2.Station) return 1;
      if (s1.Station < s2.Station) return -1;
      return 0;
    });
    console.log(this.Aufgabedata);
    this.setAntwort(this.fragenr);
    this.stations = this.database.stations;
    //setze hier erste Frage:
    let Aufgabe0 = this.Aufgabedata[0];
    //console.log(this.Aufgabedata[0]);
    this.aktlAufgabeinfo = this.Aufgabedata[0].Zusatzinfo;
    let Frage0 = Aufgabe0.Frage - 1; // 1-1 = Stelle 0
    console.log(Aufgabe0.Frage - 1);

    this.aktstation = this.ausgewähltestations[0];
    this.Fragetext = this.Fragedata[Frage0].FrageText;
    this.Fragebild = this.Fragedata[Frage0].FrageBild;
    this.Fragevideo = this.Fragedata[Frage0].FrageVideo;
    console.log(this.Fragetext);

    this.fragenr = 1;
    this.infocontentobject = this.database.getInfoContent();
  }

  onLink(url: string) {
    window.open(url);
  }

  abbruchbtn() {
    this.globalvar.ausgewaeltestationen = [];
    this.navCtrl.push(AuswahlStationPage);
  }

  aktlAufgabeinfo: number;
  infocontentobject = [];
  zusatzinfobutton() {

    let zusatzinfomodal = this.modalCtrl.create(ZusatzinfoPage, { aktlAufgabeinfo: this.aktlAufgabeinfo, infoContents: this.infocontentobject });
    zusatzinfomodal.present();
  }
  indexAufgabe = 0;

  nextbtn() {
    //Frage:
    this.indexAufgabe++;
    this.fragenr++;
    let aktlAufgabe = this.Aufgabedata[this.indexAufgabe];
    console.log(this.Aufgabedata[this.indexAufgabe]);
    if (aktlAufgabe == undefined) {
      this.indexAufgabe--;
      this.fragenr--;
      this.globalvar.ausgewaeltestationen = [];
      let alert = this.alertController.create({
        title: 'Geschafft!',
        subTitle: 'Du hast die ausgewählten Fragen vollständig durchgearbeitet.',
        buttons: [
          {
            text: 'Zurück',
            role: 'cancel',
            handler: () => {
              this.navCtrl.push(AuswahlStationPage);
              console.log('Zurück');
            }
          }
        ]
      });
      alert.present();
      return;
    }

    this.aktlAufgabeinfo = this.Aufgabedata[this.indexAufgabe].Zusatzinfo;
    let aktlFrage = aktlAufgabe.Frage;
    console.log(aktlAufgabe.Frage);
    console.log(aktlAufgabe.Station);
    let aktlstation = aktlAufgabe.Station;

    for (let i = 0; i < this.stations.length; i++) {
      if (i == aktlstation) {
        this.aktstation = this.stations[i - 1];
        console.log(this.stations[0]);
      }
    }
    console.log(this.aktstation);
    this.Fragetext = this.Fragedata[aktlFrage].FrageText;
    this.Fragebild = this.Fragedata[aktlFrage].FrageBild;
    this.Fragevideo = this.Fragedata[aktlFrage].FrageVideo;
    console.log(this.Fragetext);

    //Antwort
    this.setAntwort(this.indexAufgabe);
  }
  lastbtn() {
    this.indexAufgabe--;
    this.fragenr--;
    let aktlAufgabe = this.Aufgabedata[this.indexAufgabe];
    console.log(this.Aufgabedata[this.indexAufgabe]);
    if (aktlAufgabe == undefined) {
      this.indexAufgabe++;
      this.fragenr++;
      return;
    }

    let aktlFrage = aktlAufgabe.Frage;
    console.log(aktlAufgabe.Frage);
    console.log(aktlAufgabe.Station);
    let aktlstation = aktlAufgabe.Station;

    for (let i = 0; i < this.stations.length; i++) {
      if (i == aktlstation) {
        this.aktstation = this.stations[i - 1];
        console.log(this.stations[0]);
      }
    }
    console.log(this.aktstation);
    this.Fragetext = this.Fragedata[aktlFrage].FrageText;
    this.Fragebild = this.Fragedata[aktlFrage].FrageBild;
    this.Fragevideo = this.Fragedata[aktlFrage].FrageVideo;
    console.log(this.Fragetext);

    //Antwort
    this.setAntwort(this.indexAufgabe);
  }

  Antwort1: any;
  Antwort2: any;
  Antwort3: any;
  Antwort4: any;

  aktlAufgabenAntwortID: any; //ID von Aufgabe
  aktlAufgabenAntwort: any; //Antwort[] von Antwort
  aktlAufgabenTypendefinitionID: any;
  aktlAufgabenTypendefinitionString: string;

  setAntwort(aktindexNr: number) {

    //Antwort noch auf Bezirk und Standort überprüfen ob null
    //und aktuelle Eingaben (Bezirk und FF) vergleichen
    //wenn undefined --> drinnen lassen
    //wenn Bezirk null ist --> drinnen lassen --> sonst Standortabfrage
    //wenn standort null --> Bezirk vergleichen --> gleich --> drinnen lassen
    // Aufgabedata wird somit verändert 

    this.Antwort1 = undefined;
    this.Antwort2 = undefined;
    this.Antwort3 = undefined;
    this.Antwort4 = undefined;
    console.log(aktindexNr);
    console.log(this.Aufgabedata);
    this.aktlAufgabenAntwortID = this.Aufgabedata[aktindexNr].Antwort;
    console.log(this.aktlAufgabenAntwortID);
    this.aktlAufgabenAntwort = this.database.Antworten[this.aktlAufgabenAntwortID - 1];
    console.log(this.aktlAufgabenAntwort);
    this.aktlAufgabenTypendefinitionID = this.aktlAufgabenAntwort.FkTypendefinition;
    this.aktlAufgabenTypendefinitionString = this.database.typendefinitionobject[this.aktlAufgabenTypendefinitionID - 1].TypName;
    console.log(this.aktlAufgabenAntwort);
    console.log(this.aktlAufgabenTypendefinitionID);
    console.log(this.aktlAufgabenTypendefinitionString);

    let AntwortContentID = this.database.antwortobject[this.aktlAufgabenAntwortID - 1].AntwortContentID;
    //console.log(AntwortContentID);
    switch (this.aktlAufgabenTypendefinitionString) {
      case "A_T":
        {
          let aktlText = this.database.Antwort_Textobject[AntwortContentID - 1].Text;
          console.log(aktlText);
          this.Antwort1 = aktlText;
          // #region hidecards       
          this.hidetext = true;
          this.hideslider = false;
          this.hideradio = false;
          //this.hidelabel = false;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion      
        }
        break;
      case "A_S":
        {
          let min;
          let max;
          let sprungweite;
          let slidertext;
          let value;

          // #region hidecards
          this.hidetext = false;
          this.hideslider = true;
          this.hideradio = false;
          //this.hidelabel = false;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion
        }
        break;
      case "A_DP":
        {
          let date;

          // #region hidecards
          this.hidetext = false;
          this.hideslider = false;
          this.hideradio = false;
          //this.hidelabel = false;
          this.hidedate = true;
          this.hidecheckbox = false;
          // #endregion
        }
        break;
      case "A_CB:T": {
        let anzahl;
        let inhalte = []; // texte
        let checkboxvalue = []; // true oder false
        // #region hidecards
        this.hidetext = false;
        this.hideslider = false;
        this.hideradio = false;
        // this.hidelabel = false;
        this.hidedate = false;
        this.hidecheckbox = true;
        // #endregion
      }
        break;
      case "A_CB:B": {
        let anzahl;
        let inhalte = []; // texte
        let checkboxvalue = []; // true oder false
        // #region hidecards
        this.hidetext = false;
        this.hideslider = false;
        this.hideradio = false;
        // this.hidelabel = false;
        this.hidedate = false;
        this.hidecheckbox = true;
        // #endregion     
      }
        break;
      case "A_RB:T":
        {
          let anzahl;
          let content = [];
          let Erwartungsweit = []; //true oder false
          // #region hidecards
          this.hidetext = false;
          this.hideslider = false;
          this.hideradio = true;
          // this.hidelabel = false;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion
        }
        break;
      case "A_RB:B":
        {
          let anzahl;
          let content = [];
          let Erwartungsweit = []; //true oder false
          // #region hidecards
          this.hidetext = false;
          this.hideslider = false;
          this.hideradio = true;
          //this.hidelabel = false;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion
        }
        break;
      case "A_V:T-T?M":
        {
          let anzahl;
          let Teile1 = []; //alle 1. Teile 
          let Teile2 = []; //alle 2. Teile
          // #region hidecards
          this.hidetext = false;
          this.hideslider = false;
          this.hideradio = false;
          //  this.hidelabel = false;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion  
        }
        break;
      case "A_V:B-T?M":
        {
          let anzahl;
          let Teile1 = []; //alle 1. Teile 
          let Teile2 = []; //alle 2. Teile
          // #region hidecards
          this.hidetext = false;
          this.hideslider = false;
          this.hideradio = false;
          //  this.hidelabel = false;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion
        }
        break;
      case "A_V:B-B?M":
        {
          let anzahl;
          let Teile1 = []; //alle 1. Teile 
          let Teile2 = []; //alle 2. Teile
          // #region hidecards
          this.hidetext = false;
          this.hideslider = false;
          this.hideradio = false;
          //this.hidelabel = false;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion}
        }
        break;
      case "A_V:B-B?V":
        {
          let anzahl;
          let Teile1 = []; //alle 1. Teile 
          let Teile2 = []; //alle 2. Teile
          // #region hidecards
          this.hidetext = false;
          this.hideslider = false;
          this.hideradio = false;
         // this.hidelabel = false;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion
        }
        break;
    }
  }
};




