import { Component, OnInit } from '@angular/core';
import { GlobalVars } from "../../../providers/globals";
import { NavController } from 'ionic-angular';
import { AuswahlStationPage } from '../../BasicLayouts/AuswahlStation/AuswahlStation';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { ZusatzinfoPage } from '../Modalzusatzinfo/zusatzinfo';
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

    //console.log(this.aktstation);

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
    //this.data = this.database.ALLDATA;
    this.Fragedata = this.database.frageobject;
    this.Aufgabedata = [];
    this.Aufgabedata = this.database.getausgewählteAufgaben();
    //console.log(this.database.getausgewählteAufgaben());
    //console.log(this.globalvar.aktlfeuerwehr);
    let Aufgabenbezirkindex;
    for (var b = 0; b < this.database.bezirkobject.length; b++) {
      if (this.database.bezirkobject[b].BezirkName == this.globalvar.aktlbezirk) {
        Aufgabenbezirkindex = this.database.bezirkobject[b].BezirkID;
      }
    }
    console.log(this.Aufgabedata.length);
    console.log(this.Aufgabedata);
    var AufgabenIndex = 0;
    var filteredAufgabendata = this.Aufgabedata;
    AufgabenIndex = this.Aufgabedata.length;

    for (var i = 0; i < this.Aufgabedata.length; i++) {
      console.log(i);
      console.log(this.Aufgabedata[i]);
      if (this.Aufgabedata[i].Standort == undefined) {
        if (this.Aufgabedata[i].Bezirk == undefined) {
          console.log("Standort undefined und Bezirk undefined");
        }
        else if (Aufgabenbezirkindex == this.Aufgabedata[i].Bezirk) {
          console.log("Standort undefined und Bezirk gleich");
        } else {
          //herauslöschen 
          //console.log(this.globalvar.aktlbezirk);
          //console.log(Aufgabenbezirkindex);
          console.log("herauslöschen von Bezirk " + this.Aufgabedata[i].Bezirk);
          //let index = filteredAufgabendata.indexOf(filteredAufgabendata[i],0);
          //if (index > -1) {           
          //  filteredAufgabendata.splice(index, 1);
          //}

          filteredAufgabendata = filteredAufgabendata.filter(obj => obj != this.Aufgabedata[i]);
        }
      } else { //Standort steht drinnen
        let AufgabestandortOrtsname;
        console.log(this.Aufgabedata[i].Standort + " Standort steht drinnen");
        for (var a = 0; a < this.database.allestandorte.length; a++) {
          if (this.database.allestandorte[a].StandortID == this.Aufgabedata[i].Standort) {
            AufgabestandortOrtsname = this.database.allestandorte[a].Ortsname;
            console.log(this.database.allestandorte[a].Ortsname);
          }
        }

        //console.log(AufgabestandortOrtsname);
        if (AufgabestandortOrtsname == this.globalvar.aktlfeuerwehr) {
          //donothing
          console.log(AufgabestandortOrtsname + " ist gleich mit aktl FF");
        }
        else {
          //herauslöschen
          console.log("herauslöschen der Aufgabe");
          console.log(this.Aufgabedata[i]);
          //let index = filteredAufgabendata.indexOf(filteredAufgabendata[i],0);
          //if (index > -1) {           
          //  filteredAufgabendata.splice(index, 1);
          //}
          filteredAufgabendata = filteredAufgabendata.filter(obj => obj != this.Aufgabedata[i]);
        }
      }
    }

    console.log(filteredAufgabendata);
    console.log(this.Aufgabedata);
    this.Aufgabedata = filteredAufgabendata;
    this.Aufgabedata.sort(function (a, b) {
      return a.Station - b.Station;
    });

    //this.Aufgabedata.sort((s1, s2) =>
    //  s1.AufgabeID < s2.AufgabeID ? -1 : s1.AufgabeID > s2.AufgabeID ? 1 : 0
    //);

    //this.Aufgabedata.sort((s1, s2) =>
    //  s1.Station < s2.Station ? -1 : s1.Station > s2.Station ? 1 : 0
    //);
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
      //console.log(this.database.frageobject[a].FrageID);
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

  checkboxarray = []; //true oder false 
  CheckboxAntworten = [];

  //checkbox und radiobuttons variablen für bilder
  Img1: string;
  Img2: string;
  Img3: string;
  Img4: string;
  ImgArray = [];

  //radiobutton

  radioboolarray = [];// true oder false
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

    //this.aktlAufgabenAntwort = this.database.Antworten[this.aktlAufgabenAntwortID - 1];
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
          //this.hidelabel = false;
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
          //this.hidelabel = false;
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
        console.log(inhalte);

        // shuffle both arrays same
        // first is not affected
        var i = 0, len = checkboxvalue.length, next, order = [];
        while (i < len) order[i] = ++i; //[1,2,3...]
        order.sort(function () { return Math.random() - .5 });

        for (i = 0; i < len; i++) {
          next = order[i];
          checkboxvalue.push(checkboxvalue[next]);
          inhalte.push(inhalte[next]);
        }
        checkboxvalue.splice(1, len);
        inhalte.splice(1, len);
        // end of shuffle

        for (var inh = 0; inh < inhalte.length; inh++) {
          this.CheckboxAntworten[inh] = inhalte[inh];
          this.checkboxarray[inh] = checkboxvalue[inh];
        }

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
      case "A_CB:B": { //ComboboxBilder
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
          console.log(Erwartungswert);

          // shuffle both arrays same
          // first index is not affected
          var i = 0, len = Erwartungswert.length, next, order = [];
          while (i < len) order[i] = ++i; //[1,2,3...]
          order.sort(function () { return Math.random() - .5 });

          for (i = 0; i < len; i++) {
            next = order[i];
            Erwartungswert.push(Erwartungswert[next]);
            content.push(content[next]);
          }
          Erwartungswert.splice(1, len);
          content.splice(1, len);
        // end of shuffle
         
          for (var ant = 0; ant < content.length; ant++) {
            this.RadiobuttonAntworten[ant] = content[ant];
            this.radioboolarray[ant] = Erwartungswert[ant];
            if (this.radioboolarray[ant] == true) {
              this.radiobuttonAntwort = this.RadiobuttonAntworten[ant];
            }
          }
          console.log(this.radioboolarray);


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
      case "A_RB:B": //sollte Bilder als Auswahl haben
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
      case "A_V:T-T?M": //Antwortverbinden
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
      case "A_V:B-T?M": //Antwortverbinden
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
      case "A_V:B-B?M": //Antwortverbinden
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
      case "A_V:B-B?V": //Antwortverbinden
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
}




