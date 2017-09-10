import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimetableProvider } from '../../providers/timetable/timetable'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private timetable: TimetableProvider, public navParams: NavParams) {
    console.log("enter HomePage")
  }

}
