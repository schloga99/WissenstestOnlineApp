import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuswahlStationPage } from '../pages/BasicLayouts/AuswahlStation/AuswahlStation';
import { AuswahlStufePage } from '../pages/BasicLayouts/AuswahlStufe/AuswahlStufe';
import { EingabeFFPage } from '../pages/BasicLayouts/EingabeFF/EingabeFF';
import { AnmeldungBewerterPage } from '../pages/PrüfungsLayouts/AnmeldungBewerter/AnmeldungBewerter';
import { AnmeldungStationPage } from '../pages/PrüfungsLayouts/AnmeldungStation/AnmeldungStation';
import { AuswahlPrüfStationPage } from '../pages/PrüfungsLayouts/AuswahlPrüfStation/AuswahlPrüfStation';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AuswahlStationPage,
        AuswahlStufePage,
        EingabeFFPage,
        AnmeldungBewerterPage,
        AnmeldungStationPage,
        AuswahlPrüfStationPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AuswahlStationPage,
        AuswahlStufePage,
        EingabeFFPage,
        AnmeldungBewerterPage,
        AnmeldungStationPage,
        AuswahlPrüfStationPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
