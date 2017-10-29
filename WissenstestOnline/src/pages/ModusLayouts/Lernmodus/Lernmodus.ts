import { Component } from '@angular/core';
import { GlobalVars } from "../../../providers/globals";
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-Lernmodus',
    templateUrl: 'Lernmodus.html'
})
export class LernmodusPage {

    constructor(public navCtrl: NavController) {

    }

    onLink(url: string) {
        window.open(url);
    }
}