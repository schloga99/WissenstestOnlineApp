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

  hideantwort: boolean = false;
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
  stations = [];
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
    this.setAntworttext(this.fragenr);

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
    this.Aufgabedata.sort((s1, s2) =>{
      if (s1.Station > s2.Station) return 1;
      if (s1.Station < s2.Station) return -1;
      return 0;
    });
    console.log(this.Aufgabedata);

    this.stations = this.database.stations;
    //setze hier erste Frage:
    let Aufgabe0 = this.Aufgabedata[0];
    console.log(this.Aufgabedata[0]);

    let Frage0 = Aufgabe0.Frage;
    console.log(Aufgabe0.Frage);
    this.aktstation = this.ausgewähltestations[0];
    this.Fragetext = this.Fragedata[Frage0].FrageText;
    this.Fragebild = this.Fragedata[Frage0].FrageBild;
    this.Fragevideo = this.Fragedata[Frage0].FrageVideo;
    console.log(this.Fragetext);


    this.fragenr = 1;
  }

  onLink(url: string) {
    window.open(url);
  }

  abbruchbtn() {
    this.globalvar.ausgewaeltestationen = [];
    this.navCtrl.push(AuswahlStationPage);
  }

  testinfo: any = "Funktioniert";
  zusatzinfobutton() {

    let zusatzinfomodal = this.modalCtrl.create(ZusatzinfoPage, { info: this.testinfo });
    zusatzinfomodal.present();

  }
  indexAufgabe = 0;
  nextbtn() {
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
  }

  Antwort1: any;
  Antwort2: any;
  Antwort3: any;
  Antwort4: any;

  setAntworttext(aktfrageNr: number) {

  }
};




