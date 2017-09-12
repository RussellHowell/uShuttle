import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import { LocationListSelectorPage } from '../location-list-selector/location-list-selector';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

onCampusNav = {
  tripLocation: "On Campus"
}

offCampusNav = {
  tripLocation: "Off Campus"
}

  tab1Root = HomePage;
  tripTypeSelectorRoot = LocationListSelectorPage;


  constructor() {

  }
}
