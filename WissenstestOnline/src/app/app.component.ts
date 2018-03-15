import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen} from 'ionic-native';
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
    providers: [database]
})
export class MyApp {
  rootPage = StartLayoutPage; 

    constructor(platform: Platform, public database: database) {        
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.                      
            StatusBar.styleDefault();
            Splashscreen.hide();            
        });
        
        this.database.setBezirk()
          .then(value => {
            if (value) {
              console.log("Standorteintragung");
              this.database.setStandort();
            }           
          });

        this.database.setStufe();
        this.database.setStation();       
        this.database.setAufgabe();
        this.database.setInfoContent();
        this.database.setFrage();
        this.database.setZusatzinfo();
        this.database.setTypendefinition();

        //Antwortdaten from server
        this.database.setAntwort();
        this.database.setAntwort_Checkbox();
        this.database.setAntwort_Datepicker();
        this.database.setAntwort_Radiobuttons();
        this.database.setAntwort_Slider();
        this.database.setAntwort_Text();
        this.database.setAntwort_Verbinden();
        this.database.setPaar();
        this.database.setCheckboxen();
        this.database.setRadioButtons();     
    }
}

