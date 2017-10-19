import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    templateUrl: 'Lernmodus.html'
})
export class LernmodusPage {

    constructor(public navCtrl: NavController) {

    }

    onLink(url: string) {
        window.open(url);
    }
}