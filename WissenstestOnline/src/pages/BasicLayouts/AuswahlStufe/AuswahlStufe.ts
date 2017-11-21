import { Component } from '@angular/core';
import { GlobalVars } from "../../../providers/globals";
import { NavController } from 'ionic-angular';
import { EingabeFFPage } from "../EingabeFF/EingabeFF";
import { AuswahlStationPage } from "../AuswahlStation/AuswahlStation";

@Component({
    selector: 'page-AuswahlStufe',
    templateUrl: 'AuswahlStufe.html'
})
export class AuswahlStufePage{
   
    stufe: any;
    aktFF: any;

    constructor(public navCtrl: NavController, private globalvar: GlobalVars) {
        this.stufe = -1;
        
    }    

    ionViewWillLoad() {
        this.aktFF = this.globalvar.getfeuerwehr();
        console.log(this.aktFF);
    }


    onLink(url: string) {
        window.open(url);
    }

    weiterbtn() {
        console.log(this.stufe);
        if (this.stufe != -1) //noch falsch, muss überprüft mit feuerwehr werden
        {

            this.globalvar.setstufe(this.stufe);
            this.navCtrl.push(AuswahlStationPage);

        } else {

        }
    }

    backbtn() {

        this.globalvar.setstufe(-1);
        this.navCtrl.push(EingabeFFPage);
    }
    public id1Color: string = '#ffffff';
    public id2Color: string = '#ffffff';
    public id3Color: string = '#ffffff';
    public white: string = '#ffffff';

    replyClick(clicked_id) {
        console.log(clicked_id);
        this.stufe = clicked_id;
        if (clicked_id == 1)
        {
            if (this.id1Color === this.white) {
                this.id1Color = '#FC0A1C'
                this.id2Color = this.white
                this.id3Color = this.white
            } else {
                this.id1Color = this.white
            }
        } else if (clicked_id == 2)
        {
            if (this.id2Color === this.white) {
                this.id2Color = '#FC0A1C'
                this.id1Color = this.white
                this.id3Color = this.white
            } else {
                this.id2Color = this.white
            }
        }
        else if (clicked_id == 3) {
            if (this.id3Color === this.white) {
                this.id3Color = '#FC0A1C'
                this.id1Color = this.white
                this.id2Color = this.white
            } else {
                this.id3Color = this.white
            }
        }
        
    }
    
}

