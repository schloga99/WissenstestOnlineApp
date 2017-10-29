import { Component } from '@angular/core';
import { GlobalVars } from "../../../providers/globals";
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-AuswahlStation',
    templateUrl: 'AuswahlStation.html'
})
export class AuswahlStationPage {

    constructor(public navCtrl: NavController) {

    }

    onLink(url: string) {
        window.open(url);
    }
}