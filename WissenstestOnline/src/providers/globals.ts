import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {
    aktlfeuerwehr: any;
    aktlbezirk: any;
  
    constructor() {
        this.aktlfeuerwehr = "";
        this.aktlbezirk = "";
    }

    setfeuerwehrandbezirk(valuef,valueb) {
        this.aktlfeuerwehr = valuef;
        this.aktlbezirk = valueb;
    }

    getfeuerwehr() {
        return this.aktlfeuerwehr;
    }

}