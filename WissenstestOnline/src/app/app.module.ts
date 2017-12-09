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
        StartLayoutPage
    ],
    imports: [       
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
        StartLayoutPage
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler }, GlobalVars, database,
        { provide: Storage, useFactory: provideStorage }, Storage
    ]
})
export class AppModule { }


