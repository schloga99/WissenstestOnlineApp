import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    templateUrl: 'AnmeldungStation.html'
})
export class AnmeldungStationPage {

    constructor(public navCtrl: NavController) {

    }

    onLink(url: string) {
        window.open(url);
    }
}