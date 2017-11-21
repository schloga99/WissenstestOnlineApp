import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';

import { EingabeFFPage } from '../pages/BasicLayouts/EingabeFF/EingabeFF';
import { AuswahlStationPage } from '../pages/BasicLayouts/AuswahlStation/AuswahlStation';
import { AuswahlStufePage } from '../pages/BasicLayouts/AuswahlStufe/AuswahlStufe';
import { LernmodusPage } from '../pages/ModusLayouts/Lernmodus/Lernmodus';
import { ÜbungsmodusPage } from '../pages/ModusLayouts/Übungsmodus/Übungsmodus';
import { StartLayoutPage } from '../pages/BasicLayouts/StartLayout/StartLayout';
import { GlobalVars } from '../providers/globals';

@Component({
    templateUrl: 'app.html',
    
})
export class MyApp {
    rootPage = StartLayoutPage;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            
        });
    }
}
