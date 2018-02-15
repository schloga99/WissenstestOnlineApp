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
  hidecheckboxbilder: boolean = false;
  hideradiobilder: boolean = false;

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

  //slider
  min: any;
  max: any;
  sprungweite: any;
  slidertext: any;
  slidervalue: any;

  //datepicker
  datevalue: any;

  //checkbox
  checkbox1: boolean=false;
  checkbox2: boolean=false;
  checkbox3: boolean=false;
  checkbox4: boolean = false;
  hidecheckbox3: boolean = false;
  hidecheckbox4: boolean = false;

  //checkbox bilder
  Img1: string;
  Img2: string;
  Img3: string;
  Img4: string;

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
          this.min = this.database.Antwort_Sliderobject[AntwortContentID - 1].MinVal;
          this.max = this.database.Antwort_Sliderobject[AntwortContentID - 1].MaxVal;
          this.sprungweite = this.database.Antwort_Sliderobject[AntwortContentID - 1].Sprungweite;
          this.slidertext = this.database.Antwort_Sliderobject[AntwortContentID - 1].SliderText;
          this.slidervalue = this.database.Antwort_Sliderobject[AntwortContentID - 1].ErwartungsWert;
          console.log(this.slidervalue);
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
          //console.log(this.database.Antwort_DatePickerobject[AntwortContentID - 1].Date);
          let dateEU = this.database.Antwort_DatePickerobject[AntwortContentID - 1].Date;          
          let dateArray = dateEU.split('.');
          let datestring = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];         
          let date = new Date(datestring).toISOString();
          this.datevalue = date;
          console.log(datestring);
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
        let inhalte = []; // texte
        let count = 0;
        let checkboxvalue = []; // true oder false
        console.log(AntwortContentID);
        let anzahl = this.database.Antwort_Checkboxobject[AntwortContentID - 1].Anzahl;
        for (var i = 0; i < this.database.Checkboxobject.length; i++) {
          if (AntwortContentID == this.database.Checkboxobject[i].FkAntwortCheckbox) {
            inhalte[count] = this.database.Checkboxobject[i].Inhalt;
            checkboxvalue[count] = this.database.Checkboxobject[i].CheckboxVal;
            count++;
          }
        }

        this.Antwort1 = inhalte[0];
        this.Antwort2 = inhalte[1];
        this.hidecheckbox3 = false;
        this.hidecheckbox4 = false;
        this.checkbox1 = checkboxvalue[0];
        this.checkbox2 = checkboxvalue[1];
        if (anzahl > 2) {
          this.Antwort3 = inhalte[2]; this.checkbox3 = checkboxvalue[2]; this.hidecheckbox3 = true;
        }
        if (anzahl > 3) {
          this.Antwort4 = inhalte[3]; this.checkbox4 = checkboxvalue[3]; this.hidecheckbox4 = true;
        }
        //console.log(anzahl + " Anzahl checkboxen");
       // console.log(this.hidecheckbox3 +" checkbox boolean");
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
        let inhalte = []; // string url's vom Bild
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




