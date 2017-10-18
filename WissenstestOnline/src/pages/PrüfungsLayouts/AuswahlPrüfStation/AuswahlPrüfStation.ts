import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'AuswahlPrüfStation.html'
})
export class AuswahlPrüfStationPage {

    constructor(public navCtrl: NavController) {

    }

    onLink(url: string) {
        window.open(url);
    }
}