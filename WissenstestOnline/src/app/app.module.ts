import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuswahlStationPage } from '../pages/BasicLayouts/AuswahlStation/AuswahlStation';
import { AuswahlStufePage } from '../pages/BasicLayouts/AuswahlStufe/AuswahlStufe';
import { EingabeFFPage } from '../pages/BasicLayouts/EingabeFF/EingabeFF';
import { AnmeldungBewerterPage } from '../pages/PrüfungsLayouts/AnmeldungBewerter/AnmeldungBewerter';
import { AnmeldungStationPage } from '../pages/PrüfungsLayouts/AnmeldungStation/AnmeldungStation';
import { AuswahlPrüfStationPage } from '../pages/PrüfungsLayouts/AuswahlPrüfStation/AuswahlPrüfStation';
import { LernmodusPage } from '../pages/ModusLayouts/Lernmodus/Lernmodus';
import { ÜbungsmodusPage } from '../pages/ModusLayouts/Übungsmodus/Übungsmodus';


@NgModule({
    declarations: [
        MyApp,
        AuswahlStationPage,
        AuswahlStufePage,
        EingabeFFPage,
        AnmeldungBewerterPage,
        AnmeldungStationPage,
        AuswahlPrüfStationPage,
        LernmodusPage,
        ÜbungsmodusPage
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
        AnmeldungBewerterPage,
        AnmeldungStationPage,
        AuswahlPrüfStationPage,
        LernmodusPage,
        ÜbungsmodusPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
