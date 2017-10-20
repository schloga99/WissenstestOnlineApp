import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-EingabeFF',
    templateUrl: 'EingabeFF.html'
})
export class EingabeFFPage {

    bezirke: any;
    constructor(public navCtrl: NavController) {
        this.bezirke = [
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



    }

    onLink(url: string) {
        window.open(url);
    }
}