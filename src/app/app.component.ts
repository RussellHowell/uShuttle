import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TimetableProvider } from '../providers/timetable/timetable';
import { ErrorPage } from '../pages/error/error';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  debugInfo: any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, timetable: TimetableProvider) {

    timetable.loadTimetable().then((Response) =>
    {
        //timetale successfully loaded
        this.rootPage = TabsPage;
    },
    (error)=>
    {
      this.rootPage = ErrorPage;
      this.debugInfo = error;
      console.error(error);
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
