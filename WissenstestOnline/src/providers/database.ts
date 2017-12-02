import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

@Injectable()
export class database {

    private IndxDb: IDBFactory;
    public db: IDBDatabase;
    dbName: "database";
    constructor(public storage: Storage) {
        this.IndxDb = window.indexedDB;
        this.openDB();

    }

    openDB() {
        var req: IDBOpenDBRequest;
        req = this.IndxDb.open(this.dbName, 1);

        req.onupgradeneeded = function (e: any) {

            
        }
       
    }
 
    ResetDB() {
        this.db.close();
        this.IndxDb.deleteDatabase(this.dbName);
        this.openDB();
    }
}