import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimetableProvider } from '../../providers/timetable/timetable';
import { LocationDetailPage } from '../location-detail/location-detail';

@IonicPage()
@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html',
})
export class LocationListPage {

  tripType: string;
  timetableProv: TimetableProvider;
  locations: string[];
  detailPage = LocationDetailPage;

  constructor(public navCtrl: NavController, private timetableProvider: TimetableProvider, public navParams: NavParams) {
    this.timetableProv = timetableProvider;
    this.tripType = navParams.data.tripType;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationListPage');
    this.getTimetableLocs();
  }

  getTimetableLocs(){
    console.log("Getting " + this.tripType + " locations");
    this.locations = this.timetableProvider.getLocations(this.tripType);
  }

  //grab the next time at specified location
  getNextTime(location){
    return this.timetableProvider.getNextTime(this.tripType, location).format("hh:mm a");
  }

  imgString(loc){
    return "assets/img/" + loc + ".jpg";
  }


}
