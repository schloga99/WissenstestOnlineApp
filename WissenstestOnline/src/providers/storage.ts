import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class storage {
    // INFO
    // Es gibt 11 Stationen

    constructor(public storage: Storage) {

    }

    bezirke = [];
    //bezirke = [
    //    'Grieskirchen',
    //    'Braunau am Inn',
    //    'Eferding',
    //    'Freistadt',
    //    'Gmunden',
    //    'Kirchdorf an der Krems',
    //    'Linz-Land',
    //    'Perg',
    //    'Ried im Innkreis',
    //    'Rohrbach',
    //    'Schärding',
    //    'Steyr-Land',
    //    'Urfahr-Umgebung',
    //    'Vöcklabruck',
    //    'Wels-Land',
    //]; // 15 Bezirke

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
    ]; // bleiben gleich
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
    //bezirke = [
    //    ['1', 'Grieskirchen'],
    //    ['2', 'Braunau am Inn'],
    //    ['3', 'Eferding'],
    //    ['4', 'Freistadt'],
    //    ['5', 'Gmunden'],
    //    ['6', 'Kirchdorf an der Krems'],
    //    ['7', 'Linz-Land'],
    //    ['8', 'Perg'],
    //    ['9', 'Ried im Innkreis'],
    //    ['10', 'Rohrbach'],
    //    ['11', 'Schärding'],
    //    ['12', 'Steyr-Land'],
    //    ['13', 'Urfahr-Umgebung'],
    //    ['14', 'Vöcklabruck'],
    //    ['15', 'Wels-Land'],
    //]; 


    Fragen = [
        ["0", "Wie lang ist ein C-Druckschlauch?"],
        ["1", "Wie heißt dein Feuerwehrkommandant?"],
        ["2", "Welche Mitglieder hat die Feuerwehr?"],
        ["3", "Welche Feuerwehrfahrzeuge besitzt deine Feuerwehr?"]
    ];
    Antworten = [ //richtige Antwort vlt. durch Kennzeichnung 1,2,3,4 als letzten Parameter[5]
        ["0", "15 Meter"],
        ["1", "15"],
        ["2", "Herr..."]
    ];

    //FrageArt = ["oöweit", "bezirksbezogen", "ortsbezogen"];  
    //FragenBronzeStation1 = [ 
    //    ["0", "Zu welchen Bezirk gehört deine Gemeinde?"],
    //    ["1", "Wie heißt dein Feuerwehrkommandant?"],
    //    ["2", "Welche Mitglieder hat die Feuerwehr?"],
    //    ["3", "Welche Feuerwehrfahrzeuge besitzt deine Feuerwehr?"]
    //];

    //AntwortenBronzeStation1FF1 = [ //fehler
    //    ["0", "Schärding"],
    //    ["1", "nächste Antwort"]
    //];

    //FragenSilberStation1 = [
    //    ["0", "Wer ist der Schutzpatron der Feuerwehr?"],
    //    ["1", "Welche Arten von Feuerwehren gibt es?"],
    //    ["2", "Wo befinden sich das LFKDO und die LFS?"]
    //];
    //AntwortenSilberStation1 = [
    //    ["0", "Andreas", "Florian", "Maximilian", "Johannes"],
    //    ["1", "nächste Antwort"]
    //];

    //FragenGoldStation1 = [
    //    ["0", "Für wie viele Jahre wird das Feuerwehrkommando gewählt?"],
    //    ["1", "Wie heißt die kleinste, taktisch selbständige, einsetzbare Feuerwehreinheit und aus wie vielen Personen besteht sie?"],
    //    ["2", "Ab welchem Alter darf man aktiven Feuerwehrdienst leisten?"]
    //];
    //FragenSilberStation3 = [
    //    ["0", "Wie lange ist ein C-Druckschlauch?"],
    //    ["1", "Welche Arten von Feuerwehren gibt es?"],
    //    ["2", "Wo befinden sich das LFKDO und die LFS?"]
    //];

    //AntwortenSilberStation3FF1 = [
    //    ["0", "15 Meter"],
    //    ["1", "nächste Antwort"]
    //];
    typendefinitionen = ["Fragetyp", "Antworttyp", "ZusätzlichTyp"];
    fragetypen = ["Label", "Slider", "Date Picker", "Inputtext", "Radio Button"];
    testinfo = ["Hier wurden Labels verwendet ..... mehr Text", "Hier wurden Slider verwendet ..... mehr Text", "Hier wurden Date Picker verwendet ..... mehr Text"];


    setstorage() { // Key = Tabelle

        //this.storage.set('Bezirk', this.bezirke);
        //this.storage.set('Stations', this.stations);        
        //this.storage.set('Fragetypen', this.fragetypen);        
        //this.storage.set('FragenBronzeStation1', this.FragenBronzeStation1);
        //this.storage.set('FragenSilberStation1', this.FragenSilberStation1);
        //this.storage.set('FragenGoldStation1', this.FragenGoldStation1);
        //this.storage.set('testinfo', this.testinfo);
       
            this.storage.set('Bezirk0FF', this.bezirk0FF)
            this.storage.set('Antworten', this.Antworten);
            this.storage.set('Fragen', this.Fragen);
            this.storage.set('Frage', "value");
            this.storage.set('Typendefinition', "value");
            this.storage.set('Aufgabe', "value");
            this.storage.set('Antwort', "value");
            this.storage.set('Zusatzinfo', this.testinfo);
            this.storage.set('InfoContent', "value");
            this.storage.set('Station', this.stations);
            this.storage.set('Stufe', "value");
            this.storage.set('Hintergrund', "value");
            this.storage.set('Antwort_Text', "value");
            this.storage.set('Antwort_DatePicker', "value");
            this.storage.set('Antwort_Slider', "value");
            this.storage.set('Antwort_Checkbox', "value");
            this.storage.set('Checkbox', "value");
            this.storage.set('Antwort_RadioButtons', "value");
            this.storage.set('RadioButtons', "value");
            this.storage.set('Bezirk', this.bezirke);
            this.storage.set('Standort', "value");
        
        this.storage.ready().then(() => {
            this.storage.get('Bezirk').then((val) => { // retrive               
                this.bezirke = val;
                console.log(this.bezirke);
            });
        });
    }

}