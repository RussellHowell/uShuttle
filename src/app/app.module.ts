import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LocationListPage } from '../pages/location-list/location-list';
import { LocationListSelectorPage } from '../pages/location-list-selector/location-list-selector';
import { LocationDetailPage } from '../pages/location-detail/location-detail';
import { ErrorPage } from '../pages/error/error';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TimetableProvider } from '../providers/timetable/timetable';
import { HttpModule }    from '@angular/http';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LocationListPage,
    LocationListSelectorPage,
    LocationDetailPage,
    ErrorPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LocationListPage,
    LocationListSelectorPage,
    LocationDetailPage,
    ErrorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TimetableProvider

  ]
})
export class AppModule {}
