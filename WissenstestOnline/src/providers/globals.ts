﻿import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {
    aktlfeuerwehr: any;
    aktlbezirk: any;
    aktlstufe: any;
    ausgewaeltestationen: any;
    modus: any;

    constructor() {
        this.aktlfeuerwehr = "";
        this.aktlbezirk = "";
        this.aktlstufe = -1;
        this.modus = -1;
    }

    setfeuerwehrandbezirk(valuef,valueb) {
        this.aktlfeuerwehr = valuef;
        this.aktlbezirk = valueb;
    }

    getfeuerwehr() {
        return this.aktlfeuerwehr;
    }
    setstufe(value) { //value = 1,2 or 3
        this.aktlstufe = value;
    }
    getaktlstufe()
    {
        return this.aktlstufe;
    }
    setstationen() {

    }
    getstationen() {
        return this.ausgewaeltestationen;
    }
    setmodus(value) { // 1 or 2
        this.modus = value;
    }
    getmodus() {
        return this.modus;
    }
}