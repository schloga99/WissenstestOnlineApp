import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { MyApp } from '../../../app/app.component';
import { GlobalVars } from "../../../providers/globals";
import { database } from "../../../providers/database";
import { LernmodusPage } from "../Lernmodus/Lernmodus";
import { ÜbungsmodusPage} from "../Übungsmodus/Übungsmodus";
import { Info } from './Info';


@Component({
  selector: 'page-Zusatzinfo',
  templateUrl: 'Zusatzinfo.html'
})
export class ZusatzinfoPage implements OnInit {

  header: any;
  aktlInfo: number;
  infocontentobject = [];
  allanzeigendeinfo: Info[] = [];
  imgSrc: any = `http://servlet.dmi.dk/byvejr/servlet/byvejr_dag1?by=8000&mode=long`;
  constructor(public navParams: NavParams, public navCtrl: NavController, public viewCtrl: ViewController, private globalvar: GlobalVars, public database:database) {
  
  }
  ngOnInit() {
    console.log(this.navParams.get('aktlAufgabeinfo'));
    this.aktlInfo = this.navParams.get('aktlAufgabeinfo');
    this.infocontentobject = this.navParams.get('infoContents');   
    console.log(this.infocontentobject);

    for (var a of this.infocontentobject) {
      //console.log(a);
      if (a.FkZusatzinfo == this.aktlInfo)
      {
        if (a.InfoContent.startsWith('http')) {
          this.allanzeigendeinfo.push({
            Header: a.Heading, Img: a.InfoContent
          });
        } else {
          this.allanzeigendeinfo.push({
            Header: a.Heading, Content: a.InfoContent
          });
        }
      }
    }

    //console.log(this.allanzeigendeinfo[0].Img);


  }

  onLink(url: string) {
    window.open(url);
  }

  zurueck() {
    this.viewCtrl.dismiss();
  }
}

