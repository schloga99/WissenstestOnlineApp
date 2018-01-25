export class Aufgabe {
  AufgabeID: number;
  Station: number;
  Stufe: number;
  Antwort: number;
  Frage: number;
  Zusatzinfo: number;
  Pflichtaufgabe: boolean;
  TeilAufgabeVon?: number;
  Bezirk?: number;
  Standort?: number;

  constructor() { }
}
