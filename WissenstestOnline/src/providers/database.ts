import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class database {

    constructor(public storage: Storage) {

    }
    bezirke = [
        'Grieskirchen',
        'Braunau am Inn',
        'Eferding',
        'Freistadt',
        'Gmunden',
        'Kirchdorf an der Krems',
        'Linz-Land',
        'Perg',
        'Ried im Innkreis',
        'Rohrbach',
        'Schärding',
        'Steyr-Land',
        'Urfahr-Umgebung',
        'Vöcklabruck',
        'Wels-Land',
    ];
    setstorage() {
        this.storage.set('key', 'value'); // store
        this.storage.set('Bezirk', this.bezirke);

    }
}