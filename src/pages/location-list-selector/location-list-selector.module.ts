import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationListSelectorPage } from './location-list-selector';

@NgModule({
  declarations: [
    LocationListSelectorPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationListSelectorPage),
  ],
})
export class LocationListSelectorPageModule {}
