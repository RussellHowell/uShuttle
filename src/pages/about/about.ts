import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {



  timetableData: any [];
  timetableDates: any[];
  currentDate: Date;
  tripType: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.timetableDates = [];
    // this.timetable.getData().subscribe((data) => {
    //   this.timetableData = data;
    //     this.tripType = navParams.data.tripType;
    //   this.populateTimetable();

  //  });

  }

  // populateTimetable(){
  //
  //   for (const key of Object.keys(this.timetableData["on_campus_weekday"])) {
  //       //console.log(key, this.timetableData["on_campus_weekday"][key]);
  //
  //       //this.timetableDates.push(key);
  //
  //       let datetimes = [];
  //       let earlytimes = [];
  //       let morningIndex = 0;
  //
  //       this.timetableData["on_campus_weekday"][key].forEach((time) => {
  //
  //         let x = moment(time, 'HH:mm');
  //
  //         if (x < moment('01:30', 'HH:mm'))
  //       {
  //         datetimes.splice(morningIndex, 0, moment(x, 'HH:mm'));
  //         morningIndex++;
  //         datetimes.push(moment(x,'HH:mm').add(1,'days'));
  //       }
  //       else
  //       {
  //         datetimes.push(moment(x,'HH:mm'));
  //       }
  //
  //
  //
  //       });
  //
  //       this.timetableDates[key] = datetimes;
  //
  //   }
  //
  //     console.log(this.timetableDates);
  //
  // }

}
