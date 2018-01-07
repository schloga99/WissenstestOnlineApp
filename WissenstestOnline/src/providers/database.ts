import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { storage } from '../providers/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class database {
    count: number = 0;
    bezirke = [];
    apiUrl = 'http://localhost:3000/';
    constructor(public http: Http, public ownstorage: storage) {

    }

    getRemoteData() {
        //this.getBezirk();
        //this.getFrage();
        //this.getTypendefinition();
        //this.getAufgabe();
        //this.getZusatzinfo();
        //this.getInfoContent();
        //this.getStation();
        //this.getStufe();
        //this.getStandort();
        //this.getAntwort();
        //this.getHintergrund();

    }

    setBezirk() {

        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'Bezirk').map(res => res.json()).subscribe(data => {
                //console.log(JSON.stringify(data));
                console.log(data);
                console.log(typeof (data));
                console.log(data[0].BezirkName);

                for (var x of data) {
                    this.bezirke[this.count] = data[this.count].BezirkName;
                    this.count++;
                }
                this.count = 0;
                //console.log(this.ownstorage.bezirke);
                resolve(this.bezirke);
            });
        });
    }

    setStandort() {

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

    setHintergrund() {

    }
    setAntwort() {

    }

    getBezirk() {
        console.log(this.bezirke);
        return this.bezirke;
    }
}