import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen} from 'ionic-native';
import { Storage } from '@ionic/storage';
import { EingabeFFPage } from '../pages/BasicLayouts/EingabeFF/EingabeFF';
import { AuswahlStationPage } from '../pages/BasicLayouts/AuswahlStation/AuswahlStation';
import { AuswahlStufePage } from '../pages/BasicLayouts/AuswahlStufe/AuswahlStufe';
import { LernmodusPage } from '../pages/ModusLayouts/Lernmodus/Lernmodus';
import { ÜbungsmodusPage } from '../pages/ModusLayouts/Übungsmodus/Übungsmodus';
import { StartLayoutPage } from '../pages/BasicLayouts/StartLayout/StartLayout';
import { GlobalVars } from '../providers/globals';
import { database } from '../providers/database';

@Component({
    templateUrl: 'app.html',
    
})
export class MyApp {
    rootPage = EingabeFFPage; 

    constructor(platform: Platform, public storage: Storage, public database: database) {        
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.                      
            StatusBar.styleDefault();
            Splashscreen.hide();
            this.initStorageData();
        });
    }
    initStorageData() { //Hier werden ALLE Daten für den Wissenstest geladen (in den Storage gespeichert)
        this.storage.length().then((value) => {
            this.storage.clear();
            this.database.setstorage();
            console.log(value + " keys in storage");
            if (value == null) {
                this.database.setstorage();
                console.log("storage was empty, set storage")
            }
            
        })   
    }
}
