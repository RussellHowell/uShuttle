import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimetableProvider } from '../../providers/timetable/timetable';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  tripType: string;
  timetableProv: TimetableProvider;
  locations: string[];
  homePage = HomePage;

  constructor(public navCtrl: NavController, private timetableProvider: TimetableProvider, public navParams: NavParams) {
    this.timetableProv = timetableProvider;
    this.tripType = navParams.data.tripType;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
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


}
