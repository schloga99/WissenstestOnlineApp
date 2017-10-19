import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { EingabeFFPage } from '../pages/BasicLayouts/EingabeFF/EingabeFF';
import { AuswahlStationPage } from '../pages/BasicLayouts/AuswahlStation/AuswahlStation';
import { AuswahlStufePage } from '../pages/BasicLayouts/AuswahlStufe/AuswahlStufe';
import { AnmeldungBewerterPage } from '../pages/PrüfungsLayouts/AnmeldungBewerter/AnmeldungBewerter';
import { AnmeldungStationPage } from '../pages/PrüfungsLayouts/AnmeldungStation/AnmeldungStation';
import { AuswahlPrüfStationPage } from '../pages/PrüfungsLayouts/AuswahlPrüfStation/AuswahlPrüfStation';
import { LernmodusPage } from '../pages/ModusLayouts/Lernmodus/Lernmodus';
import { ÜbungsmodusPage } from '../pages/ModusLayouts/Übungsmodus/Übungsmodus';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage = AuswahlStufePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
