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

  originTime: String;
  destinationTime: String;

  constructor(public navCtrl: NavController, private timetable: TimetableProvider, public navParams: NavParams) {
   this.tripType = navParams.data.trip;
   this.locationList = timetable.getLocations(this.tripType);
   this.from = navParams.data.loc;
   this.to = this.locationList[0];
   this.locationMod = "leave";
   this.time = moment().format();

}

  findTrip(){
    let result = this.timetable.findTrip(this.tripType, this.from, this.to, this.locationMod, this.time);
    this.originTime = moment(result.origin).format("hh:mm a");
    this.destinationTime = moment(result.destination).format("hh:mm a");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationDetailPage');
  }

  imgString(loc){
    return "assets/img/" + loc + ".jpg";
  }



}
