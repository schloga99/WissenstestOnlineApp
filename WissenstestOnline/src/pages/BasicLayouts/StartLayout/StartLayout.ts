import { Component } from '@angular/core';
import { EingabeFFPage } from '../EingabeFF/EingabeFF';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-StartLayout',
    templateUrl: 'StartLayout.html'
})
export class StartLayoutPage {

    constructor(public navCtrl: NavController) {

    }

    onLink(url: string) {
        window.open(url);
    }
    loadEingabeFF() {
        this.navCtrl.push(EingabeFFPage);
    }
}