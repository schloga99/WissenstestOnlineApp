import { Component, OnInit } from '@angular/core';
import { EingabeFFPage } from '../EingabeFF/EingabeFF';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-StartLayout',
    templateUrl: 'StartLayout.html'
})

export class StartLayoutPage {

    constructor(public navCtrl: NavController,public alertController: AlertController) {             
    }

    onLink(url: string) {
        window.open(url);
    }
    bezirke = [];
    loadEingabeFF() {               
        this.navCtrl.push(EingabeFFPage);
    }
}
