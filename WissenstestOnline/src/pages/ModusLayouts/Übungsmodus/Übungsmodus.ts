import { Component, OnInit } from '@angular/core';
import { GlobalVars } from "../../../providers/globals";
import { NavController } from 'ionic-angular';
import { AuswahlStationPage } from '../../BasicLayouts/AuswahlStation/AuswahlStation';
import { AlertController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { ZusatzinfoPage } from '../Modalzusatzinfo/zusatzinfo'
import { database } from '../../../providers/database';
import { Aufgabe } from '../Lernmodus/Aufgabe';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-uebungsmodus',
  templateUrl: 'Übungsmodus.html'
})
export class ÜbungsmodusPage {

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
  anzahlStationen: number;

  hidetext: boolean = false;
  hidecheckbox: boolean = false;
  hideradio: boolean = false;
  hidedate: boolean = false;
  hideslider: boolean = false;
  hidecheckboxbilder: boolean = false;
  hideradiobilder: boolean = false;

  //data = [];
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
    this.Fragedata = this.database.frageobject;
    this.Aufgabedata = [];
    this.Aufgabedata = this.database.getausgewählteAufgaben();

    console.log(this.globalvar.aktlfeuerwehr);
    let Aufgabenbezirkindex;
    for (var b = 0; b < this.database.bezirkobject.length; b++) {
      if (this.database.bezirkobject[b].BezirkName == this.globalvar.aktlbezirk) {
        Aufgabenbezirkindex = this.database.bezirkobject[b].BezirkID;
      }
    }

    for (var i = 0; i < this.Aufgabedata.length; i++) {
      if (this.Aufgabedata[i].Standort == undefined) {
        if (this.Aufgabedata[i].Bezirk == undefined) {
          //donothing
        }
        else if (Aufgabenbezirkindex == this.Aufgabedata[i].Bezirk) {
          //donothing
        } else {
          //herauslöschen 
          console.log(this.globalvar.aktlbezirk);
          console.log(Aufgabenbezirkindex);
          console.log(this.Aufgabedata[i].Bezirk);
          let index = this.Aufgabedata.indexOf(this.Aufgabedata[i]);
          if (index > -1) {
            this.Aufgabedata.splice(index, 1);
          }
        }
      } else {
        let AufgabestandortOrtsname;
        console.log(this.database.allestandorte.length);
        for (var a = 0; a < this.database.allestandorte.length; a++) {
          if (this.database.allestandorte[a].StandortID == this.Aufgabedata[i].Standort) {
            AufgabestandortOrtsname = this.database.allestandorte[a].Ortsname;
            console.log(this.database.allestandorte[a].Ortsname);
          }
        }
        console.log(AufgabestandortOrtsname);
        if (AufgabestandortOrtsname != this.globalvar.aktlfeuerwehr) {

          if (this.Aufgabedata[i].Bezirk == undefined) {
            //donothing
          }
          if (Aufgabenbezirkindex == this.Aufgabedata[i].Bezirk) {
            //donothing
          } else {
            //herauslöschen
            console.log(this.globalvar.aktlbezirk);
            console.log(this.Aufgabedata[i].Bezirk);
            console.log(this.Aufgabedata[i]);
            let index = this.Aufgabedata.indexOf(this.Aufgabedata[i]);
            if (index > -1) {
              this.Aufgabedata.splice(index, 1);
            }
          }
        }
      }
    }

    //console.log(this.database.getausgewählteAufgaben());
    this.Aufgabedata.sort(function (a, b) {
      return a.Station - b.Station;
    });


    console.log(this.Aufgabedata);
    this.anzahlStationen = this.Aufgabedata.length;
    this.setAntwort(this.fragenr);
    this.stations = this.database.stations;
    //setze hier erste Frage:
    let Aufgabe0 = this.Aufgabedata[0];
    console.log(this.Aufgabedata[0]);
    this.aktlAufgabeinfo = this.Aufgabedata[0].Zusatzinfo;
    let Frage0 = Aufgabe0.Frage;
    console.log(Aufgabe0.Frage);

    for (var a = 0; a < this.database.frageobject.length; a++) {
      console.log(this.database.frageobject[a].FrageID);
      if (Frage0 == this.database.frageobject[a].FrageID) {
        this.Fragetext = this.Fragedata[a].FrageText;
        this.Fragebild = this.Fragedata[a].FrageBild;
        this.Fragevideo = this.Fragedata[a].FrageVideo;
      }
    }
    this.aktstation = this.ausgewähltestations[0];
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
  boolBeantwortet: boolean = false;

  //Eingaben von User
  InputText:string="";
  InputRadioButtonChecked = [];
  InputCheckboxChecked = [];
  InputSliderValue:number = 0;
  InputDate: any;


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
    console.log(this.Fragedata);
    for (var a = 0; a < this.Fragedata.length; a++) {
      if (this.Fragedata[a].FrageID == aktlFrage) {
        this.Fragetext = this.Fragedata[a].FrageText;
        this.Fragebild = this.Fragedata[a].FrageBild;
        this.Fragevideo = this.Fragedata[a].FrageVideo;
        console.log(this.Fragetext);
      }
    }
    //Antwort
    if (this.boolBeantwortet == false) {
      this.boolBeantwortet = true;
      this.setAntwort(this.indexAufgabe);
    } else {
      this.vergleicheAntwort(this.indexAufgabe);
    }
    //Antwort
    //this.setAntwort(this.indexAufgabe);

  }

  vergleicheAntwort(aktindexNr: number) {
    this.InputText = "";
    this.boolBeantwortet = false;
  }

  lastbtn() {
    this.boolBeantwortet == false;
    this.indexAufgabe--;
    this.fragenr--;

    let aktlAufgabe = this.Aufgabedata[this.indexAufgabe];
    console.log(this.Aufgabedata[this.indexAufgabe]);
    if (aktlAufgabe == undefined) {
      this.indexAufgabe++;
      this.fragenr++;
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
    for (var a = 0; a < this.Fragedata.length; a++) {
      if (this.Fragedata[a].FrageID == aktlFrage) {
        this.Fragetext = this.Fragedata[a].FrageText;
        this.Fragebild = this.Fragedata[a].FrageBild;
        this.Fragevideo = this.Fragedata[a].FrageVideo;
        console.log(this.Fragetext);
      }
    }
   
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

  checkboxarray = []; //true oder false (checked)
  CheckboxAntworten = [];

  //checkbox und radiobuttons variablen für bilder
  ImgArray = [];

  //radiobutton

  radioboolarray = []; //true oder false (checked)
  RadiobuttonAntworten = [];
  radiobuttonAntwort: string;
 

  setAntwort(aktindexNr: number) {

    this.Antwort1 = undefined;
    this.Antwort2 = undefined;
    this.Antwort3 = undefined;
    this.Antwort4 = undefined;
    console.log(aktindexNr);
    console.log(this.Aufgabedata);
    this.aktlAufgabenAntwortID = this.Aufgabedata[aktindexNr].Antwort;
    console.log(this.aktlAufgabenAntwortID);
    let aktlAntwortIndex = 0;
    for (var a = 0; a < this.database.Antworten.length; a++) {
      //console.log(this.database.Antworten[a].AntwortID);
      if (this.aktlAufgabenAntwortID == this.database.Antworten[a].AntwortID) {
        this.aktlAufgabenAntwort = this.database.Antworten[a];
        aktlAntwortIndex = a;
        console.log(this.database.Antworten[a]);
        console.log(aktlAntwortIndex);
      }
    }

    console.log(this.database.Antworten);
    console.log(this.aktlAufgabenAntwort);
    this.aktlAufgabenTypendefinitionID = this.aktlAufgabenAntwort.FkTypendefinition;
    console.log(this.database.typendefinitionobject);
    this.aktlAufgabenTypendefinitionString = this.database.typendefinitionobject[this.aktlAufgabenTypendefinitionID - 1].TypName;

    console.log(this.aktlAufgabenAntwort);
    console.log(this.aktlAufgabenTypendefinitionID);
    console.log(this.aktlAufgabenTypendefinitionString);
    console.log(this.database.antwortobject);
    let AntwortContentID = this.database.antwortobject[aktlAntwortIndex].AntwortContentID;
    console.log(AntwortContentID);

    switch (this.aktlAufgabenTypendefinitionString) {
      case "A_T":
        {
          for (var i = 0; i < this.database.Antwort_Textobject.length; i++) {
            if (AntwortContentID == this.database.Antwort_Textobject[i].AntwortContentID) {
              let aktlText = this.database.Antwort_Textobject[i].Text;
              console.log(aktlText);
              this.Antwort1 = aktlText;
            }
          }

          // #region hidecards       
          this.hidetext = true;
          this.hideslider = false;
          this.hideradio = false;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion      
        }
        break;
      case "A_S":
        {
          console.log(this.database.Antwort_Sliderobject.length);
          console.log(this.database.Antwort_Sliderobject);

          for (var i = 0; i < this.database.Antwort_Sliderobject.length; i++) {
            if (AntwortContentID == this.database.Antwort_Sliderobject[i].AntwortContentID) {
              this.min = this.database.Antwort_Sliderobject[i].MinVal;
              this.max = this.database.Antwort_Sliderobject[i].MaxVal;
              this.sprungweite = this.database.Antwort_Sliderobject[i].Sprungweite;
              this.slidertext = this.database.Antwort_Sliderobject[i].SliderText;
              this.slidervalue = this.database.Antwort_Sliderobject[i].ErwartungsWert;
              console.log(this.slidervalue);
            }
          }

          // #region hidecards
          this.hidetext = false;
          this.hideslider = true;
          this.hideradio = false;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion
        }
        break;
      case "A_DP":
        {
          for (var i = 0; i < this.database.Antwort_DatePickerobject.length; i++) {
            if (AntwortContentID == this.database.Antwort_DatePickerobject[i].AntwortContentID) {
              let dateEU = this.database.Antwort_DatePickerobject[i].Date;
              let dateArray = dateEU.split('.');
              let datestring = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
              let date = new Date(datestring).toISOString();
              this.datevalue = date;
              console.log(datestring);
            }
          }
          // #region hidecards
          this.hidetext = false;
          this.hideslider = false;
          this.hideradio = false;
          this.hidedate = true;
          this.hidecheckbox = false;
          // #endregion
        }
        break;
      case "A_CB:T": {
        let inhalte = []; // texte
        let count = 0;
        this.CheckboxAntworten = [];
        this.checkboxarray = [];
        let checkboxvalue = []; // true oder false
        console.log(AntwortContentID);
        let anzahl;
        for (var a = 0; a < this.database.Antwort_Checkboxobject.length; a++) {
          if (AntwortContentID == this.database.Antwort_Checkboxobject[a].AntwortContentID) {
            anzahl = this.database.Antwort_Checkboxobject[a].Anzahl;
          }
        }

        for (var i = 0; i < this.database.Checkboxobject.length; i++) {
          if (AntwortContentID == this.database.Checkboxobject[i].FkAntwortCheckbox) {
            inhalte[count] = this.database.Checkboxobject[i].Inhalt;
            checkboxvalue[count] = this.database.Checkboxobject[i].CheckBoxVal;
            count++;
          }
        }
        console.log(checkboxvalue);
        for (var inh = 0; inh < inhalte.length; inh++) {
          this.CheckboxAntworten[inh] = inhalte[inh];
          this.checkboxarray[inh] = checkboxvalue[inh];
        }

        // #region hidecards
        this.hidetext = false;
        this.hideslider = false;
        this.hideradio = false;
        this.hidedate = false;
        this.hidecheckbox = true;
        // #endregion
      }
        break;
      case "A_CB:B": { //ComboboxBilder
        let anzahl;
        let inhalte = []; // string url's vom Bild
        let checkboxvalue = []; // true oder false

        // #region hidecards
        this.hidetext = false;
        this.hideslider = false;
        this.hideradio = false;
        this.hidedate = false;
        this.hidecheckbox = true;
        // #endregion     
      }
        break;
      case "A_RB:T":
        {
          for (var a = 0; a < this.database.Antwort_RadioButtonsobject.length; a++) {
            if (AntwortContentID == this.database.Antwort_RadioButtonsobject[a].AntwortContentID) {
              let anzahl = this.database.Antwort_RadioButtonsobject[a].Anzahl;
            }
          }

          let count = 0;
          let content = [];
          let Erwartungswert = []; //true oder false
          this.RadiobuttonAntworten = [];
          this.radioboolarray = [];
          for (var i = 0; i < this.database.RadioButtonsobject.length; i++) {
            if (AntwortContentID == this.database.RadioButtonsobject[i].FkAntwortRadiobuttons) {
              content[count] = this.database.RadioButtonsobject[i].Content;
              Erwartungswert[count] = this.database.RadioButtonsobject[i].ErwartungsWert;
              count++;
            }
          }
          this.Antwort1 = content[0];
          this.Antwort2 = content[1];
          for (var ant = 0; ant < content.length; ant++) {
            this.RadiobuttonAntworten[ant] = content[ant];
            this.radioboolarray[ant] = Erwartungswert[ant];
            if (this.radioboolarray[ant] == true) {
              this.radiobuttonAntwort = this.RadiobuttonAntworten[ant];
            }
          }
          console.log(Erwartungswert[0]);          
          // #region hidecards
          this.hidetext = false;
          this.hideslider = false;
          this.hideradio = true;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion
        }
        break;
      case "A_RB:B": //sollte Bilder als Auswahl haben
        {
          let anzahl;
          let content = [];
          let Erwartungsweit = []; //true oder false
          // #region hidecards
          this.hidetext = false;
          this.hideslider = false;
          this.hideradio = true;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion
        }
        break;
      case "A_V:T-T?M": //Antwortverbinden
        {
          let anzahl;
          let Teile1 = []; //alle 1. Teile 
          let Teile2 = []; //alle 2. Teile
          // #region hidecards
          this.hidetext = false;
          this.hideslider = false;
          this.hideradio = false;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion  
        }
        break;
      case "A_V:B-T?M": //Antwortverbinden
        {
          let anzahl;
          let Teile1 = []; //alle 1. Teile 
          let Teile2 = []; //alle 2. Teile
          // #region hidecards
          this.hidetext = false;
          this.hideslider = false;
          this.hideradio = false;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion
        }
        break;
      case "A_V:B-B?M": //Antwortverbinden
        {
          let anzahl;
          let Teile1 = []; //alle 1. Teile 
          let Teile2 = []; //alle 2. Teile
          // #region hidecards
          this.hidetext = false;
          this.hideslider = false;
          this.hideradio = false;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion}
        }
        break;
      case "A_V:B-B?V": //Antwortverbinden
        {
          let anzahl;
          let Teile1 = []; //alle 1. Teile 
          let Teile2 = []; //alle 2. Teile
          // #region hidecards
          this.hidetext = false;
          this.hideslider = false;
          this.hideradio = false;
          this.hidedate = false;
          this.hidecheckbox = false;
          // #endregion
        }
        break;
    }
  }
}
