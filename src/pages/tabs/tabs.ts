import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import { LocationListPage } from '../location-list/location-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

onCampusNav = {
  tripType: "On Campus"
}

offCampusNav = {
  tripType: "off_campus_weekday"
}

  tab1Root = HomePage;
  tab2Root = LocationListPage;

  constructor() {

  }
}
