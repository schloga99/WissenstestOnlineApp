import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    templateUrl: 'AuswahlStation.html'
})
export class AuswahlStationPage {

    constructor(public navCtrl: NavController) {

    }

    onLink(url: string) {
        window.open(url);
    }
}