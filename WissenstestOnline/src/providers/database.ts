import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class database {

    constructor(public storage: Storage) {

    }
    bezirke = [
        'Grieskirchen',
        'Braunau am Inn',
        'Eferding',
        'Freistadt',
        'Gmunden',
        'Kirchdorf an der Krems',
        'Linz-Land',
        'Perg',
        'Ried im Innkreis',
        'Rohrbach',
        'Schärding',
        'Steyr-Land',
        'Urfahr-Umgebung',
        'Vöcklabruck',
        'Wels-Land',
    ];
    stations = [
        'Allgemeinwissen',
        'Dienstgrade',
        'Wasserführende Armaturen + technische Geräte',
        'Vorbeugender Brandschutz',
        'Seilknoten',
        'Nachrichtenübermittlung',
        'Verkehrserziehung und Absichern von Einsatzstellen',
        'Erste Hilfe',
        'Taktik',
        'Gefährliche Stoffe',
        'Atem- und Körperschutz',
    ];
    bezirk0FF = [
        'Aistersheim',
        'Bad Schallerbach',
        'Bruck-Waasen',
        'Eschenau im Hausruckkreis',
        'Gallspach',
        'Gaspoltshofen',
        'Geboltskirchen',
        'Grieskirchen',
        'Haag am Hausruck',
        'Heiligenberg',
        'Hofkirchen an der Trattnach',
        'Kallham',
        'Kematen am Innbach',
        'Meggenhofen',
        'Michaelnbach',
    ];
    Fragen = ['Wie lang ist ein Wasserdruckschlauch?'];
    Antworten = [ //richtige Antwort vlt. durch Kennzeichnung 1,2,3,4 als letzten Parameter[5]
        ["0", "10 Meter", "20 Meter", "15 Meter", "30 Meter"],
        ["1", 10, 20, 30, 40],
        ["2", "Herr...", "Herr....", "Vize...", "FeuerwehrtestDaten"]
    ];
    typendefinitionen = ["Fragetyp", "Antworttyp", "ZusätzlichTyp"];
    fragetypen = ["Buttons mit Textantworten", "Slider", "Date Picker"];



    setstorage() {       
        this.storage.set('Bezirk', this.bezirke);
        this.storage.set('Stations', this.stations);
        this.storage.set('Bezirk0FF', this.bezirk0FF)
        this.storage.set('Fragen', this.Fragen);
        this.storage.set('Fragetypen', this.fragetypen);
        this.storage.set('Antworten', this.Antworten);
    }
}