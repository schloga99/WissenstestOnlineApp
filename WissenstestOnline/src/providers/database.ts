import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { storage } from '../providers/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class database {

    apiUrl = 'http://localhost:3000/';

    bezirkobject: any;
    allestandorte: any;
    county: number = 0;
    countx: number = 0;


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

    }
    setStufe() {

    }
    setFrage() {

    }
    setTypendefinition() {

    }
    setAufgabe() {

    }
    setInfoContent() {

    }
    setZusatzinfo() {

    }
    setAntwort() {

    }

    getBezirk() {
        console.log(this.bezirke);
        return this.bezirke;
    }

    getStandorte() {
        return this.standortegeordnet;
    }
}