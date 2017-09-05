import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimetableProvider } from '../../providers/timetable/timetable';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  timetableData: any [];

  constructor(public navCtrl: NavController, private timetable: TimetableProvider) {

    this.timetable.getData().subscribe((data) => {
      console.log(data["on_campus_weekday"]["connelly"]);
      this.timetableData = data;


    });

  }

}
