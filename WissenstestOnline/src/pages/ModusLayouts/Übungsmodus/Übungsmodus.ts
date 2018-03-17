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
  NextButtonText: string = "Check";
  NextButtonText1: string = "Check";
  NextButtonText2: string = "Nächste Frage";

  ausgewähltestations: any;
  aktstation: any;
  aktstufe: any;
  stufeoutput: any;
  aktFF: any;
  fragenr: number;
  anzahlFragen: number;

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
    this.anzahlrichtigbeantwortet = 0;
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
    let Aufgabenbezirkindex;
    for (var b = 0; b < this.database.bezirkobject.length; b++) {
      if (this.database.bezirkobject[b].BezirkName == this.globalvar.aktlbezirk) {
        Aufgabenbezirkindex = this.database.bezirkobject[b].BezirkID;
      }
    }
    console.log(this.Aufgabedata);
    var AufgabenIndex = 0;
    var filteredAufgabendata = this.Aufgabedata;
    AufgabenIndex = this.Aufgabedata.length;

    for (var i = 0; i < this.Aufgabedata.length; i++) {
      
      console.log(this.Aufgabedata[i]);
      if (this.Aufgabedata[i].Standort == undefined) {
        if (this.Aufgabedata[i].Bezirk == undefined) {
          console.log("Standort undefined und Bezirk undefined");
        }
        else if (Aufgabenbezirkindex == this.Aufgabedata[i].Bezirk) {
          console.log("Standort undefined und Bezirk gleich");
        } else {
          //herauslöschen 
          console.log("herauslöschen von Bezirk " + this.Aufgabedata[i].Bezirk);
          filteredAufgabendata = filteredAufgabendata.filter(obj => obj != this.Aufgabedata[i]);
        }
      } else { //Standort steht drinnen
        let AufgabestandortOrtsname;
        console.log(this.Aufgabedata[i].Standort + " Standort steht drinnen");
        for (var a = 0; a < this.database.allestandorte.length; a++) {
          if (this.database.allestandorte[a].StandortID == this.Aufgabedata[i].Standort) {
            AufgabestandortOrtsname = this.database.allestandorte[a].Ortsname;           
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
          filteredAufgabendata = filteredAufgabendata.filter(obj => obj != this.Aufgabedata[i]);
        }
      }
    }
    this.Aufgabedata = filteredAufgabendata;
    this.Aufgabedata.sort(function (a, b) {
      return a.Station - b.Station;
    });

    console.log(this.Aufgabedata);
    this.anzahlFragen = this.Aufgabedata.length;
    this.setAntwort(this.indexAufgabe);
    this.stations = this.database.stations;
    //setze hier erste Frage:
    let Aufgabe0 = this.Aufgabedata[0];
    this.aktlAufgabeinfo = this.Aufgabedata[0].Zusatzinfo;
    let Frage0 = Aufgabe0.Frage;

    for (var a = 0; a < this.database.frageobject.length; a++) {
      if (Frage0 == this.database.frageobject[a].FrageID) {
        this.Fragetext = this.Fragedata[a].FrageText;
        this.Fragebild = "http://www.3.mitterhauser.org/images/" + this.Fragedata[a].FrageBild + ".png";
        if (this.Fragebild == "http://www.3.mitterhauser.org/images/undefined.png") {
          this.Fragebild = false;
        }
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
  myColor: string = 'hexblack';

  indexAufgabe = 0;
  boolBeantwortet: boolean = false;
  indexbeende = 0.5;

  //Eingaben von User
  InputText: string = "";
  InputRadioButtonChecked = [];
  InputCheckboxChecked = [];
  InputSliderValue: number = 0;
  InputDate: any;
  ersteFragebool = true;
  anzahlrichtigbeantwortet: number = 0;

  nextbtn() {
    if (this.NextButtonText == this.NextButtonText1) {
      this.NextButtonText = this.NextButtonText2;
    } else {
      this.NextButtonText = this.NextButtonText1;
    }

    console.log(this.indexbeende);
    if (this.lastbuttonpressed != false) {
      this.lastbuttonpressed = false;
      if (this.indexbeende == this.Aufgabedata.length) {
        this.indexbeende = this.indexbeende - 0.5;
      } else {
        this.indexbeende = this.indexbeende - 1;
      }

    }

    if (this.ersteFragebool == true) {
      this.vergleicheAntwort(this.indexAufgabe);
      this.fragenr++;
      this.indexbeende++;
      this.indexAufgabe++;
      console.log("erste Frage und Antwort verglichen")
      this.ersteFragebool = false;
    }
    else if (this.indexbeende == this.Aufgabedata.length) {      
      console.log("INDEX beende ist gleich mit Länge des Arrays");
      this.vergleicheAntwort(this.indexAufgabe);
      this.fragenr = this.fragenr + 1;
      this.indexbeende = this.indexbeende + 0.5;
      this.indexAufgabe = this.indexAufgabe + 1;
    }
    else {
      this.indexbeende = this.indexbeende + 0.5;
      console.log(this.indexbeende);
      //Frage:
      this.indexAufgabe++;
      this.fragenr++;

      let aktlAufgabe = this.Aufgabedata[this.indexAufgabe];
      console.log(this.fragenr);
      if (aktlAufgabe == undefined) {
        console.log(this.indexbeende);
        console.log(this.indexAufgabe);
        if (this.indexbeende < this.Aufgabedata.length) {
          if (this.indexAufgabe == this.Aufgabedata.length) {
            this.vergleicheAntwort(this.indexAufgabe);
            return;
          }
        }

        this.fragenr--;
        this.globalvar.ausgewaeltestationen = [];
        let alert = this.alertController.create({
          title: 'Fertig!',
          subTitle: 'Du hast ' + this.anzahlrichtigbeantwortet + ' von ' + this.anzahlFragen +' Fragen richtig beantwortet!',
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
      //Antwort
      if (this.boolBeantwortet == false) {
        this.boolBeantwortet = true;

        this.InputRadioButtonChecked = [];
        this.InputCheckboxChecked = [];
        this.InputSliderValue = 0;
        this.InputDate = null;
        this.InputText = "";
        this.background = 'white';
        this.hiderichtigeAntwort = false;

        this.setAntwort(this.indexAufgabe);
      } else {
        this.vergleicheAntwort(this.indexAufgabe);
      }

      aktlAufgabe = this.Aufgabedata[this.indexAufgabe];
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
      console.log(this.Fragedata);
      for (var a = 0; a < this.Fragedata.length; a++) {
        if (this.Fragedata[a].FrageID == aktlFrage) {
          this.Fragetext = this.Fragedata[a].FrageText;
          //this.Fragebild = this.Fragedata[a].FrageBild;
          this.Fragebild = "http://www.3.mitterhauser.org/images/" + this.Fragedata[a].FrageBild + ".png";
          if (this.Fragebild == "http://www.3.mitterhauser.org/images/undefined.png") {
            this.Fragebild = false;
          }
          this.Fragevideo = this.Fragedata[a].FrageVideo;
          console.log(this.Fragetext);
        }
      }
    }
  }
  background = 'white';
  richtigeAntwort = [];
  hiderichtigeAntwort = false;
  backgroundarray = [];

  vergleicheAntwort(aktindexNr: number) {
    if (this.Aufgabedata.length == this.fragenr - 1) {
      //not --
    } else {
      this.indexAufgabe--;
      this.fragenr--;
    }
    this.richtigeAntwort = [];
    this.backgroundarray = [];

    switch (this.aktlAufgabenTypendefinitionString) {
      case "A_T":
        {
          console.log("singleTextvergleich");
          let upperInput = this.InputText.toUpperCase();
          let upperantwort = this.Antwort1.toUpperCase();
          if (upperInput == upperantwort) {
            this.background = '#00eb00';
            console.log("richtig");
            this.anzahlrichtigbeantwortet++;
          } else {
            this.background = '#FC0A1C';
            this.richtigeAntwort.push(this.Antwort1);
            console.log("falsch");
            this.hiderichtigeAntwort = true;
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
          console.log("slidervergleich");
          if (this.InputSliderValue == this.slidervalue) {
            this.background = '#00eb00';
            this.anzahlrichtigbeantwortet++;
          } else {
            this.background = '#FC0A1C';
            this.richtigeAntwort.push(this.slidervalue);
            console.log("falsch");
            this.hiderichtigeAntwort = true;
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
        { //funktioniert nicht -> keine Testdaten oder Daten die man dafür braucht
          console.log("Datevergleich");

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
        console.log("Checkboxvergleich");
        console.log(this.InputCheckboxChecked);
        console.log(this.checkboxarray);
        let tempinput = [];
        for (var inp = 0; inp < this.checkboxarray.length; inp++) {
          tempinput.push(false);
          if (this.InputCheckboxChecked[inp] == true) {
            tempinput[inp] = true;
          }
        }
        for (var b = 0; b < this.checkboxarray.length; b++) {
          if (tempinput[b] == this.checkboxarray[b]) {
            this.backgroundarray.push('#FC0A1C');
            console.log("richtig");
          } else {
            console.log("falsch");
            this.backgroundarray.push('#00eb00');
          }
        }
        console.log(tempinput);

        this.backgroundarray = [];
        for (var a = 0; a < this.checkboxarray.length; a++) {
          if (this.checkboxarray[a] == true) {
            this.richtigeAntwort.push(this.CheckboxAntworten[a]);
            this.backgroundarray.push('#00eb00');
          } else {
            this.backgroundarray.push('#FC0A1C');
          }         
        }
        this.hiderichtigeAntwort = false;
        for (var check = 0; check < this.checkboxarray.length; check++) {
          if (this.checkboxarray[check] != tempinput[check]) {
            this.hiderichtigeAntwort = true;
          }
        }
        if (this.hiderichtigeAntwort == false) {
          this.anzahlrichtigbeantwortet++;
        }
        this.hiderichtigeAntwort = false;
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
          console.log("Radiobuttonvergleich");

          for (var a = 0; a < this.radioboolarray.length; a++) {
            if (this.InputRadioButtonChecked == undefined) {
              this.backgroundarray.push('#FC0A1C');
            } else {
              if (this.InputRadioButtonChecked == this.RadiobuttonAntworten[a]) {
                if (this.radioboolarray[a] == false) {
                  this.hiderichtigeAntwort = true;
                  this.backgroundarray.push('#FC0A1C');
                } else {
                  this.backgroundarray.push('#00eb00');
                  this.richtigeAntwort.push(this.RadiobuttonAntworten[a]);
                }
              } else {
                if (this.radioboolarray[a] == true) {
                  this.backgroundarray.push('#00eb00');
                  this.richtigeAntwort.push(this.RadiobuttonAntworten[a]);
                } else {
                  this.backgroundarray.push('#FC0A1C');
                }
              }
            }
          }
          if (this.hiderichtigeAntwort == false) {
            this.anzahlrichtigbeantwortet++;
          }
          this.hiderichtigeAntwort = false;
          console.log(this.backgroundarray);
          console.log(this.richtigeAntwort);

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
    this.boolBeantwortet = false;

  }
  lastbuttonpressed: boolean = false;
  lastbtn() {

    this.lastbuttonpressed = true;
    if (this.boolBeantwortet == false) {
      this.boolBeantwortet = true;

      this.InputRadioButtonChecked = [];
      this.InputCheckboxChecked = [];
      this.InputSliderValue = 0;
      this.InputDate = null;
      this.InputText = "";
      this.background = 'white';
      this.hiderichtigeAntwort = false;
      console.log(this.indexbeende);
      if (this.indexbeende == 2) {
        this.indexbeende = this.indexbeende - 1;
      } else if (this.indexbeende == 0) {
        this.indexbeende = this.indexbeende + 0.5;
        this.lastbuttonpressed = false;
        this.boolBeantwortet = false;
      } else if (this.indexbeende == 0.5) {
        //donothing
        this.boolBeantwortet = false;
        this.lastbuttonpressed = false;
      } else {
        this.indexbeende = this.indexbeende - 0.5;
      }

      this.setAntwort(this.indexAufgabe);
    } else {
      if (this.indexbeende > 0) {
        this.indexbeende = this.indexbeende - 0.5;
      }
    }

    this.indexAufgabe--;
    this.fragenr--;

    let aktlAufgabe = this.Aufgabedata[this.indexAufgabe];
    console.log(this.Aufgabedata[this.indexAufgabe]);
    if (aktlAufgabe == undefined) {
      this.indexAufgabe++;
      this.fragenr++;
      this.ersteFragebool = true;
      return;
    }
    this.aktlAufgabeinfo = this.Aufgabedata[this.indexAufgabe].Zusatzinfo;
    let aktlFrage = aktlAufgabe.Frage;
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
        //this.Fragebild = this.Fragedata[a].FrageBild;
        this.Fragebild = "http://www.3.mitterhauser.org/images/" + this.Fragedata[a].FrageBild + ".png";
        if (this.Fragebild == "http://www.3.mitterhauser.org/images/undefined.png") {
          this.Fragebild = false;
        }
        this.Fragevideo = this.Fragedata[a].FrageVideo;
        console.log(this.Fragetext);
      }
    }
    this.setAntwort(this.indexAufgabe);
  }

  Antwort1: any;

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
    this.backgroundarray = [];
    console.log(aktindexNr);
    this.aktlAufgabenAntwortID = this.Aufgabedata[aktindexNr].Antwort;
    console.log(this.aktlAufgabenAntwortID);
    let aktlAntwortIndex = 0;
    for (var a = 0; a < this.database.Antworten.length; a++) {
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
    let AntwortContentID = this.database.antwortobject[aktlAntwortIndex].AntwortContentID;
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

        // shuffle both arrays same
        var arrayShuffcb = new Array();
        for (var i = 0; i < checkboxvalue.length; i++) {
          arrayShuffcb.push(i);
        }
        var i = arrayShuffcb.length, j, tempi, tempj;
        if (i === 0) return false;
        while (--i) {
          j = Math.floor(Math.random() * (i + 1));
          tempi = arrayShuffcb[i];
          tempj = arrayShuffcb[j];
          arrayShuffcb[i] = tempj;
          arrayShuffcb[j] = tempi;
        }
        var temp_cbval = new Array();
        for (i = 0; i < arrayShuffcb.length; i++) {
          temp_cbval.push(checkboxvalue[arrayShuffcb[i]]);
        }
        checkboxvalue = new Array();
        checkboxvalue = temp_cbval.slice(0);
        temp_cbval = new Array();
        for (i = 0; i < arrayShuffcb.length; i++) {
          temp_cbval.push(inhalte[arrayShuffcb[i]]);
        }
        inhalte = new Array();
        inhalte = temp_cbval.slice(0);
        console.log(inhalte);
        console.log(checkboxvalue);
        // end of shuffle

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
          // shuffle both arrays same
          var arrayShuffrad = new Array();
          for (var i = 0; i < Erwartungswert.length; i++) {
            arrayShuffrad.push(i);
          }
          var i = arrayShuffrad.length, j, tempi, tempj;
          if (i === 0) return false;
          while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            tempi = arrayShuffrad[i];
            tempj = arrayShuffrad[j];
            arrayShuffrad[i] = tempj;
            arrayShuffrad[j] = tempi;
          }
          var temp_radval = new Array();
          for (i = 0; i < arrayShuffrad.length; i++) {
            temp_radval.push(Erwartungswert[arrayShuffrad[i]]);
          }
          Erwartungswert = new Array();
          Erwartungswert = temp_radval.slice(0);
          temp_radval = new Array();
          for (i = 0; i < arrayShuffrad.length; i++) {
            temp_radval.push(content[arrayShuffrad[i]]);
          }
          content = new Array();
          content = temp_radval.slice(0);
          console.log(content);
          console.log(Erwartungswert);
          // end of shuffle

          for (var ant = 0; ant < content.length; ant++) {
            this.RadiobuttonAntworten[ant] = content[ant];
            this.radioboolarray[ant] = Erwartungswert[ant];
            if (this.radioboolarray[ant] == true) {
              this.radiobuttonAntwort = this.RadiobuttonAntworten[ant];
            }
          }
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
