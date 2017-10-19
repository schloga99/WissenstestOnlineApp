import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { EingabeFFPage } from '../pages/BasicLayouts/EingabeFF/EingabeFF';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage = EingabeFFPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
