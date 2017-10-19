import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    templateUrl: 'Übungsmodus.html'
})
export class ÜbungsmodusPage {

    constructor(public navCtrl: NavController) {

    }

    onLink(url: string) {
        window.open(url);
    }
}