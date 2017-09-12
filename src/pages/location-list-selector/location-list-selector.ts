import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimetableProvider } from '../../providers/timetable/timetable';
import { LocationListPage } from '../location-list/location-list';


@IonicPage()
@Component({
  selector: 'page-location-list-selector',
  templateUrl: 'location-list-selector.html',
})
export class LocationListSelectorPage {

  tripLocation: String;
  tripTypes: any[];
  timetable: any;
  locationListPage = LocationListPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private timetableProv: TimetableProvider) {
        this.timetable = timetableProv;
        this.tripLocation = navParams.data.tripLocation;
        this.tripTypes = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationListSelectorPage');
    let tripTypes = this.timetable.getTripTypes(this.tripLocation);
    for (const tripType of Object.keys(tripTypes))
    {
      this.tripTypes.push(
        {
        "tripType": tripType,
        "info": tripTypes[tripType]["info"]
      });
    };
  }

}
