import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import {Http, Response} from '@angular/http';
import  moment  from 'moment';


import 'rxjs/add/operator/map';


@Injectable()
export class TimetableProvider {

timetable: any[];

  constructor(private http: Http) {
    console.log('Enter TimetableProvider Provider');
    this.timetable = [];
    this.loadTimetable();
}


//load timetable from JSON sourcefile and build time objects based on triptype and location
loadTimetable(){
  this.http.get("../../assets/timetable.json")
      .map((res:Response) => res.json().timetable).subscribe((timetableData) => {

        //load JSON timetable into momentJS time objects
        for (const key of Object.keys(timetableData["on_campus_weekday"])) { //TODO - generalize this to all triptypes
            

            let tmp = [];
            let morningIndex = 0; //keep track of location of first non-early morning time in array


            timetableData["on_campus_weekday"][key].forEach((time) => {

              let newTime = moment(time, 'HH:mm');

              if (newTime < moment('01:30', 'HH:mm'))
            {
              //if the time is before 01:30 add it to the beginning of the time array
              //and at the end of the array but with one day added, increment index to keep track of beginning of array
              tmp.splice(morningIndex, 0, moment(newTime, 'HH:mm'));
              morningIndex++;
              tmp.push(moment(newTime,'HH:mm').add(1,'days'));
            }
            else
            {
              tmp.push(moment(newTime,'HH:mm'));
            }

            });


            this.timetable[key] = tmp;
        }
      });


}

// //modify to return specific timetable
// getData() {
//   return this.http.get("../../assets/timetable.json")
//       .map((res:Response) => res.json().timetable);
// }

}
