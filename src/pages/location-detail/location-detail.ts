import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimetableProvider } from '../../providers/timetable/timetable'
import  moment  from 'moment';

@IonicPage()
@Component({
  selector: 'page-location-detail',
  templateUrl: 'location-detail.html',
})
export class LocationDetailPage {

  from: String;
  to: String;
  locationList: String[];
  tripType: String;
  locationMod: String;
  time: Object;

  resultTimes: Object[];
  originTimes: any[];
  destinationTimes: any[];

  constructor(public navCtrl: NavController, private timetable: TimetableProvider, public navParams: NavParams) {
   this.tripType = navParams.data.trip;
   this.locationList = timetable.getLocations(this.tripType);
   this.from = navParams.data.loc;
   this.to = this.locationList[0];
   this.locationMod = "leave";
   this.time = moment().format();
   this.resultTimes = [];
}

  findTrips(){
     this.resultTimes = this.timetable.findTrips(this.tripType, this.from, this.to, this.locationMod, this.time);
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationDetailPage');
  }


/*        DOM Helpers       */
//convert a location to an url for its corresponding image asset
  imgString(loc){
    return "assets/img/" + loc + ".jpg";
  }

  formatTime(time){
    return time.format('h:mm a');
  }

  formatDuration(duration){
    return duration.humanize();
  }

  formatTimeTo(timeTo){
    if(timeTo > moment.duration(0, 'ms'))
    {
      timeTo = moment.duration(24, 'hours').subtract(timeTo);
    }

    //format/color red for close departure times
    if(moment.duration(10, 'm').asMilliseconds() > Math.abs(timeTo.asMilliseconds()))
    {
      return "<ion-icon class='float-right' name='alert'></ion-icon><p class='red float-right'> Leaving in " + timeTo.humanize() + "</p>";
    }
    else
    {
        return "<p class='float-right'>Leaving in " + timeTo.humanize() + "</p>";
    }
  }
  clearResults()
  {
    console.log(this.resultTimes);
    //clear resultTimes object as to prevent user confusion when a new location is selected
    this.resultTimes = null;

  }








}
