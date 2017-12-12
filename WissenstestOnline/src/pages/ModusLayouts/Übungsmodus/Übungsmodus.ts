import { Component } from '@angular/core';
import { GlobalVars } from "../../../providers/globals";
import { NavController } from 'ionic-angular';
import { AuswahlStationPage } from '../../BasicLayouts/AuswahlStation/AuswahlStation'

@Component({
    selector: 'page-Übungsmodus',
    templateUrl: 'Übungsmodus.html'
})
export class ÜbungsmodusPage {

    constructor(public navCtrl: NavController) {

    }

    onLink(url: string) {
        window.open(url);
    }

    abbruchbtn() {
        this.navCtrl.push(AuswahlStationPage);
    }
}