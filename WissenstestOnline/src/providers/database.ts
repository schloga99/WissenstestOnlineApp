import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { storage } from '../providers/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class database {

    apiUrl = 'http://localhost:3000/'; // kann auch eine local json-file sein !!!

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

    bezirke = [];
    standortegeordnet = [[]];

    stufen = [];
    stations = [];
    typendefintionen = [];
    fragen = [];
    Aufgaben = [];
    InfoContent = [];
    ZusatzInfo = [];
    Antworten = [];

    constructor(public http: Http, public ownstorage: storage) {

    }

    county: number = 0;
    countx: number = 0;

    setBezirk() {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'Bezirk').map(res => res.json()).subscribe(data => {
                //console.log(JSON.stringify(data));
                console.log(data);
                this.bezirkobject = data;
                //console.log(typeof (data));
                //console.log(data[0].BezirkName);
                for (var x of data) {
                    this.bezirke[this.countx] = data[this.countx].BezirkName;
                    this.countx++;
                    //console.log(this.countx);
                }
                this.countx = 0;
                //console.log(this.ownstorage.bezirke);
                resolve(this.bezirke);
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
                for (var a of this.bezirkobject) {
                    //console.log(a);
                    if (!this.standortegeordnet[this.countx]) this.standortegeordnet[this.countx] = [];
                    for (var b of data) {
                        if (b.Bezirk == a.BezirkID) {
                            //console.log(b.Bezirk + " == " + a.BezirkID + ", " + b.OrtsName);
                            this.standortegeordnet[this.countx][this.county] = b.OrtsName;
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
    setStation() {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'Station').map(res => res.json()).subscribe(data => {
                console.log(data);
                this.stationobject = data;
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
                resolve(this.fragen);
            });
        });
    }
    setTypendefinition() {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'Typendefinition').map(res => res.json()).subscribe(data => {
                console.log(data);
                this.typendefinitionobject = data;
                resolve(this.typendefintionen);
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
            this.http.get(this.apiUrl + 'InfoContent').map(res => res.json()).subscribe(data => {
                console.log(data);
                this.infocontentobject = data;
                resolve(this.InfoContent);
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
                this.antwortobject = data;
                resolve(this.Antworten);
            });
        });
    }
    setAntwort_Text() {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'Antwort_Text').map(res => res.json()).subscribe(data => {
                console.log(data);
                this.Antwort_Textobject = data;
                resolve(this.Antwort_Textobject);
            });
        });
    }

    setAntwort_Datepicker() {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'Antwort_DatePicker').map(res => res.json()).subscribe(data => {
                console.log(data);
                this.Antwort_DatePickerobject = data;
                resolve(this.Antwort_DatePickerobject);
            });
        });
    }
    setAntwort_Slider() {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'Antwort_Slider').map(res => res.json()).subscribe(data => {
                console.log(data);
                this.Antwort_Sliderobject = data;
                resolve(this.Antwort_Sliderobject);
            });
        });
    }
    setAntwort_Checkbox() {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'Antwort_Checkbox').map(res => res.json()).subscribe(data => {
                console.log(data);
                this.Antwort_Checkboxobject = data;
                resolve(this.Antwort_Checkboxobject);
            });
        });
    }
    setAntwort_Verbinden() {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'Antwort_Verbinden').map(res => res.json()).subscribe(data => {
                console.log(data);
                this.Antwort_Verbindenobject = data;
                resolve(this.Antwort_Verbindenobject);
            });
        });
    }
    setAntwort_Radiobuttons() {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'Antwort_RadioButtons').map(res => res.json()).subscribe(data => {
                console.log(data);
                this.Antwort_RadioButtonsobject = data;
                resolve(this.Antwort_RadioButtonsobject);
            });
        });
    }
    setRadioButtons() {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'RadioButtons').map(res => res.json()).subscribe(data => {
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

    getStandorte() {
        return this.standortegeordnet;
    }
}