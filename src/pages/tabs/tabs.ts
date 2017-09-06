import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LocationPage } from '../location/location';

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
  tab2Root = LocationPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
