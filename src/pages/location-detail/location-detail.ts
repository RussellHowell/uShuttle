import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimetableProvider } from '../../providers/timetable/timetable'
import  moment  from 'moment';

/**
 * Generated class for the LocationDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController, private timetable: TimetableProvider, public navParams: NavParams) {
   this.tripType = navParams.data.trip;
   this.locationList = timetable.getLocations(this.tripType);
   this.from = navParams.data.loc;
   this.to = this.locationList[0];
   this.locationMod = "leave";
   this.time = moment().format();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationDetailPage');
  }

}
