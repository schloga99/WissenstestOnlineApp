import { Component } from '@angular/core';
import { EingabeFFPage } from '../EingabeFF/EingabeFF';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-StartLayout',
    templateUrl: 'StartLayout.html'
})


export class StartLayoutPage {

    constructor(public navCtrl: NavController, public storage: Storage) {             
     //hier nichts mit storage machen (da es sonst vielleicht nicht geladen wird wegen der RootPage)
    }

    onLink(url: string) {
        window.open(url);
    }
    bezirke = [];
    loadEingabeFF() {               
        this.navCtrl.push(EingabeFFPage);
    }
}