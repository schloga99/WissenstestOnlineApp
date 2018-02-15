import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuswahlStationPage } from '../pages/BasicLayouts/AuswahlStation/AuswahlStation';
import { AuswahlStufePage } from '../pages/BasicLayouts/AuswahlStufe/AuswahlStufe';
import { EingabeFFPage } from '../pages/BasicLayouts/EingabeFF/EingabeFF';
import { LernmodusPage } from '../pages/ModusLayouts/Lernmodus/Lernmodus';
import { ÜbungsmodusPage } from '../pages/ModusLayouts/Übungsmodus/Übungsmodus';
import { StartLayoutPage } from '../pages/BasicLayouts/StartLayout/StartLayout';
import { GlobalVars } from '../providers/globals';
import { Storage } from '@ionic/storage';
import { database } from '../providers/database';
import { HttpModule } from '@angular/http';
import { storage } from '../providers/storage';
import { ZusatzinfoPage } from '../pages/ModusLayouts/Modalzusatzinfo/zusatzinfo';

export function provideStorage() {
  return new Storage(['sqlite', 'websql', 'indexeddb'], { name: 'database' });
}
@NgModule({
  declarations: [
    MyApp,
    AuswahlStationPage,
    AuswahlStufePage,
    EingabeFFPage,
    LernmodusPage,
    ÜbungsmodusPage,
    StartLayoutPage,
    ZusatzinfoPage
  ],
  imports: [
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuswahlStationPage,
    AuswahlStufePage,
    EingabeFFPage,
    LernmodusPage,
    ÜbungsmodusPage,
    StartLayoutPage,
    ZusatzinfoPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler }, storage, GlobalVars, database,
    { provide: Storage, useFactory: provideStorage }
    
  ]
})
export class AppModule { }


