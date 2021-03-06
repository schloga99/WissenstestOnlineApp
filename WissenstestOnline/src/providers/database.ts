import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Aufgabe } from "../pages/ModusLayouts/Lernmodus/Aufgabe";
import { GlobalVars } from "./globals";

@Injectable()
export class database {

  //apiUrl = 'http://localhost:3000/'; // kann auch eine local json-file sein !!!
  //apiUrl = 'assets/testdata.json'; //man kann nur alle Daten holen
  apiUrl = 'http://www.3.mitterhauser.org/GetDB/Get?table=';
  bezirke = [];
  standortegeordnet = [[]];
  ALLDATA: any;
  stations = [];

  bezirkobject: any;
  allestandorte: any;
  frageobject: any;
  typendefinitionobject: any;
  aufgabeobject: any;
  zusatzinfoobject: any;
  infocontentobject: any;
  stationobject: any;
  stufeobject: any;
  antwortobject: any;
  Antwort_Textobject: any;
  Antwort_DatePickerobject: any;
  Antwort_Sliderobject: any;
  Antwort_Checkboxobject: any;
  Antwort_Verbindenobject: any;
  Antwort_RadioButtonsobject: any;
  Checkboxobject: any;
  RadioButtonsobject: any;
  Paarobject: any;

  stufen = [];
  typendefinitionen = [];
  Aufgaben: Aufgabe[] = [];

  InfoContent = [];
  ZusatzInfo = [];
  Antworten = [];

  constructor(public http: Http,public globals: GlobalVars) {}

  county: number = 0;
  countx: number = 0;

  //setAllData() {
  //  return new Promise(resolve => {
  //    this.http.get(this.apiUrl + 'db').map(res => res.json()).subscribe(data => {

  //      console.log(data);
  //      this.ALLDATA = data;

  //      resolve(this.ALLDATA);
  //    });
  //  });
  //}

  setBezirk() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Bezirk').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.bezirkobject = data;
        for (var x of data) {
          this.bezirke[this.countx] = data[this.countx].BezirkName;
          this.countx++;
        }
        this.countx = 0;
        resolve(this.bezirkobject);
      });
    });
  }

  setStandort() {

    return new Promise(resolve => {
      
      this.http.get(this.apiUrl + 'Standort').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.allestandorte = data;
        this.countx = 0;
        this.county = 0;       
        console.log(this.bezirkobject);
        for (var a of this.bezirkobject) {
          if (!this.standortegeordnet[this.countx]) this.standortegeordnet[this.countx] = [];
          for (var b of data) {
            if (b.FkBezirk == a.BezirkID) {
              this.standortegeordnet[this.countx][this.county] = b.Ortsname;
              this.county++;
            }
          }
          this.county = 0;
          this.countx++;
        }
        this.countx = 0;
        this.county = 0;
        console.log(this.standortegeordnet);
        resolve(this.standortegeordnet);
      });
    });
  }

  //data von den einzelnen Tabellen
  setStation() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Station').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.stationobject = data;
        for (var a of data) {
          this.stations[a.StationID - 1] = a.Stationsname;
        }
        console.log(this.stations);
        resolve(this.stations);

      });
    });
  }
  setStufe() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Stufe').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.stufeobject = data;
        resolve(this.stufen);
      });
    });
  }
  setFrage() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Frage').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.frageobject = data;
        resolve(this.frageobject);
      });
    });
  }
  setTypendefinition() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Typendefinition').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.typendefinitionobject = data;
        resolve(this.typendefinitionen);
      });
    });
  }
  setAufgabe() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Aufgabe').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.aufgabeobject = data;
        resolve(this.Aufgaben);
      });
    });
  }
  setInfoContent() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Infocontent').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.infocontentobject = data;
        resolve(this.infocontentobject);
      });
    });
  }
  setZusatzinfo() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Zusatzinfo').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.zusatzinfoobject = data;
        resolve(this.zusatzinfoobject);
      });
    });
  }
  setAntwort() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Antwort').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.Antworten = data;
        this.antwortobject = data;
        resolve(this.Antworten);
      });
    });
  }
  setAntwort_Text() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Antwort_text').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.Antwort_Textobject = data;
        resolve(this.Antwort_Textobject);
      });
    });
  }
  setAntwort_Datepicker() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Antwort_datepicker').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.Antwort_DatePickerobject = data;
        resolve(this.Antwort_DatePickerobject);
      });
    });
  }
  setAntwort_Slider() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Antwort_slider').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.Antwort_Sliderobject = data;
        resolve(this.Antwort_Sliderobject);
      });
    });
  }
  setAntwort_Checkbox() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Antwort_checkbox').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.Antwort_Checkboxobject = data;
        resolve(this.Antwort_Checkboxobject);
      });
    });
  }
  setAntwort_Verbinden() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Antwort_verbinden').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.Antwort_Verbindenobject = data;
        resolve(this.Antwort_Verbindenobject);
      });
    });
  }
  setAntwort_Radiobuttons() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Antwort_radiobutton').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.Antwort_RadioButtonsobject = data;
        resolve(this.Antwort_RadioButtonsobject);
      });
    });
  }
  setRadioButtons() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Radiobutton').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.RadioButtonsobject = data;
        resolve(this.RadioButtonsobject);
      });
    });
  }
  setCheckboxen() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Checkbox').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.Checkboxobject = data;
        resolve(this.Checkboxobject);
      });
    });
  }
  setPaar() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'Paar').map(res => res.json()).subscribe(data => {
        console.log(data);
        this.Paarobject = data;
        resolve(this.Paarobject);
      });
    });
  }

  getBezirk() {
    console.log(this.bezirke);
    return this.bezirke;
  }
  getInfoContent() {
    return this.infocontentobject;
  }
  getStandorte() {
    return this.standortegeordnet;
  }

  getstations() {
    return this.stations;
  }

  getausgewählteAufgaben() {
    let count = 0;
    let stationid = [];
    console.log(this.Aufgaben.length+ "vorher");
    this.Aufgaben.length = 0;
    console.log(this.Aufgaben.length +"nachher");
    for (let i of this.stationobject) {
      if (this.globals.ausgewaeltestationen[count] == i.Stationsname) {
        stationid[count] = i.StationID;
        count++;
      }
    }
    count = 0;
    for (let a of this.aufgabeobject) {
      for (let b = 0; b < this.stationobject.length; b++) {
        if (a.FkStation == stationid[b]) {

          if (a.FkStufe == this.globals.aktlstufe) {
            this.Aufgaben.push({
              AufgabeID: a.AufgabeID,
              Station: a.FkStation,
              Stufe: a.FkStufe,
              Antwort: a.FkAntwort,
              Frage: a.FkFrage,
              Zusatzinfo: a.FkZusatzinfo,
              Pflichtaufgabe: a.Pflichtaufgabe,
              TeilAufgabeVon: a.TeilAufgabeVon,
              Bezirk: a.FkBezirk,
              Standort: a.FkStandort,
            });
          }
        }
      }
    }
    console.log(this.Aufgaben.length + "schluss");
    return this.Aufgaben;
  }
}
