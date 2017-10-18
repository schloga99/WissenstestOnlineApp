import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'AnmeldungBewerter.html'
})
export class AnmeldungBewerterPage {

    constructor(public navCtrl: NavController) {

    }

    onLink(url: string) {
        window.open(url);
    }
}