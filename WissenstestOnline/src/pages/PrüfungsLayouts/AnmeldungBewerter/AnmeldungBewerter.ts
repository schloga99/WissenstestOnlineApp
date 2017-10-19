import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    templateUrl: 'AnmeldungBewerter.html'
})
export class AnmeldungBewerterPage {

    constructor(public navCtrl: NavController) {

    }

    onLink(url: string) {
        window.open(url);
    }
}