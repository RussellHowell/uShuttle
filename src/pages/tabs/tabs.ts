import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
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
  tab3Root = AboutPage;

  constructor() {

  }
}
