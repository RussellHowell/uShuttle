import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimetableProvider } from '../../providers/timetable/timetable'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private timetable: TimetableProvider) {
    console.log("enter HomePage")
  }

}
