import { Component } from '@angular/core';
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





}
