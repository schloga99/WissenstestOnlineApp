import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { MyApp } from '../../../app/app.component';
import { GlobalVars } from "../../../providers/globals";
import { database } from "../../../providers/database";
import { LernmodusPage } from "../Lernmodus/Lernmodus";
import { ÜbungsmodusPage} from "../Übungsmodus/Übungsmodus";


@Component({
  selector: 'page-Zusatzinfo',
  templateUrl: 'Zusatzinfo.html'
})
export class ZusatzinfoPage implements OnInit {

  header: any;
  constructor(public navParams: NavParams, public navCtrl: NavController, public viewCtrl: ViewController, private globalvar: GlobalVars) {
  
  }
  ngOnInit() {
    console.log(this.navParams.get('info'));
    this.header = this.navParams.get('info');
  }

  onLink(url: string) {
    window.open(url);
  }

  zurueck() {
    this.viewCtrl.dismiss();
  }
}

