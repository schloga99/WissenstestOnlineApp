import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class database {

    constructor(public storage: Storage) {

    }

    setstorage() {
         this.storage.set('key', 'value'); // store
    }
    
}