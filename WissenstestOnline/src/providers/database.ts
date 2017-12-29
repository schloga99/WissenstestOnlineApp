import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class database {
    // INFO
    // Es gibt 11 Stationen

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
    FragenBronzeStation1 = [ 
        ["0", "Nenne die Funktionen der Kommandomitglieder?"],
        ["1", "Wie heißt dein Feuerwehrkommandant?"],
        ["2", "Welche Mitglieder hat die Feuerwehr?"],
        ["3", "Welche Feuerwehrfahrzeuge besitzt deine Feuerwehr?"]
    ];
    FragenSilberStation1 = [
        ["0", "Wie heißt dein Landesfeuerwehrommandant?"],
        ["1", "Welche Arten von Feuerwehren gibt es?"],
        ["2", "Wo befinden sich das LFKDO und die LFS?"]
    ];
    FragenGoldStation1 = [
        ["0", "Für wie viele Jahre wird das Feuerwehrkommando gewählt?"],
        ["1", "Wie heißt die kleinste, taktisch selbständige, einsetzbare Feuerwehreinheit und aus wie vielen Personen besteht sie?"],
        ["2", "Ab welchem Alter darf man aktiven Feuerwehrdienst leisten?"]
    ];
    typendefinitionen = ["Fragetyp", "Antworttyp", "ZusätzlichTyp"];
    fragetypen = ["Labels", "Slider", "Date Picker"];
    testinfo = ["Hier wurden Labels verwendet ..... mehr Text", "Hier wurden Slider verwendet ..... mehr Text", "Hier wurden Date Picker verwendet ..... mehr Text"];

    setstorage() {       
        this.storage.set('Bezirk', this.bezirke);
        this.storage.set('Stations', this.stations);
        this.storage.set('Bezirk0FF', this.bezirk0FF)
        this.storage.set('Fragen', this.Fragen);
        this.storage.set('Fragetypen', this.fragetypen);
        this.storage.set('Antworten', this.Antworten);
        this.storage.set('FragenBronzeStation1', this.FragenBronzeStation1);
        this.storage.set('FragenSilberStation1', this.FragenSilberStation1);
        this.storage.set('FragenGoldStation1', this.FragenGoldStation1);
        this.storage.set('testinfo', this.testinfo);
    }
}