import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-AuswahlStufe',
    templateUrl: 'AuswahlStufe.html'
})
export class AuswahlStufePage {

    constructor(public navCtrl: NavController) {

    }

    onLink(url: string) {
        window.open(url);
    }
}