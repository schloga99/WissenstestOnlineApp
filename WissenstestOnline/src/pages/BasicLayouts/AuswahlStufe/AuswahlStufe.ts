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
    //ngOnInit(): void {
    //    this.aktFF = this.globalvar.getfeuerwehr();
    //}

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

    replyClick(clicked_id) {
        console.log(clicked_id);
        this.stufe = clicked_id;
    }
}

