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
import { storage } from '../providers/storage';

@Component({
    templateUrl: 'app.html',
    providers: [database]
})
export class MyApp {
  rootPage = StartLayoutPage; 

    constructor(platform: Platform, public storage: Storage, public database: database, public ownstorage: storage) {        
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.                      
            StatusBar.styleDefault();
            Splashscreen.hide();            
        });
        //this.database.setAllData();

        this.database.setBezirk();
        this.database.setStandort();
        this.database.setStufe();
        this.database.setStation();
        this.database.setAntwort();
        this.database.setAufgabe();
        this.database.setInfoContent();
        this.database.setFrage();
        this.database.setZusatzinfo();
        this.database.setTypendefinition();


        //this.database.setAntwort_Checkbox();
        //this.database.setAntwort_Datepicker();
        //this.database.setAntwort_Radiobuttons();
        //this.database.setAntwort_Slider();
        //this.database.setAntwort_Text();
        //this.database.setAntwort_Verbinden();
        //this.database.setPaar();
        //this.database.setCheckboxen();
        //this.database.setRadioButtons();

        //this.initStorageData();
    }
    //initStorageData() { //Hier werden ALLE Daten für den Wissenstest geladen (in den Storage gespeichert)
    //    this.storage.length().then((value) => {
    //        this.storage.clear();
    //        this.ownstorage.setstorage();
    //        console.log(value + " keys in storage");
    //        if (value == null) { // oder undefined
    //            this.ownstorage.setstorage();
    //            console.log("storage was empty, set storage")
    //        }
            
    //    })   
    //}
}
