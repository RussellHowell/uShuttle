import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import  moment  from 'moment';


import 'rxjs/add/operator/map';


@Injectable()
export class TimetableProvider {

timetable: any[];
dataReady: boolean;
callbacks: any[];

  constructor(private http: Http) {
    console.log('Enter TimetableProvider');
    this.timetable = [];
    this.callbacks = [];
    this.dataReady = false;
    this.loadTimetable();
}

//return location names for passed tripType back to requesting page
getLocations(tripType){
  return Object.keys(this.timetable[tripType]);
}

//retrieve the next 4 times for location from the timetable data
getNextTimes(type, location, time){
  let times = this.timetable[type][location];
  let queryTime = moment(time, 'HH:mm');
  let result = [];
  for(let i = 0; i<times.length; i++){
    if(times[i].isSameOrAfter(queryTime)){
      console.log(times[i]);
      for(let j = i; j < i+4; j++){
        result.push(times[j]);
      }
      i = times.length;
    }
  }
  return result;
}

getNextTime(type, location){
  let times = this.timetable[type][location];
  let now = moment();
  for(let i = 0; i<times.length; i++){
    if(times[i].isSameOrAfter(now)){
      return times[i];
    }
  }
}


findTrips(tripType, origin, destination, findType, time){
  let originTimes = this.timetable[tripType][origin];
  let destinationTimes = this.timetable[tripType][destination];
  let result = {origin: [], destination: []};

//if the trip modifier is "leaveAt"
  if(findType === "leave"){
    //iterate through schedule for origin location looking
    //for time that is >= requested time
      for(let i = 0; i<originTimes.length; i++){
        if(originTimes[i].isSameOrAfter(time)){
          result.origin[0] = originTimes[i];
          //get the next 3 departure times
          for(let f = i+1; (f<originTimes.length) && (f<i+4); f++){
            result.origin.push(originTimes[f]);
          }
          //find corresponding arrival times
          for(let j=0; j<destinationTimes.length; j++){
            if(destinationTimes[j].isSameOrAfter(result.origin[0])){
              result.destination[0] = destinationTimes[j];
              for(let f = j+1; (f<destinationTimes.length) && (f<j+4); f++){
                result.destination.push(destinationTimes[f]);
              }
              //break out of loop
              i = originTimes.length;
              j = destinationTimes.length;
            }
          }
        }
      }
  }else if(findType === "arrive"){ //TODO -- FIX
    for(let i = destinationTimes.length-1; i > -1; i--){
          if(destinationTimes[i].isSameOrBefore(time)){
            result.destination = destinationTimes[i];
            for(let j = originTimes.length-1; j>-1; j--){
              if(originTimes[i].isSameOrBefore(result.destination)){
                result.origin = originTimes[i];
                i = 0;
                j = 0;
              }
            }
          }
        }
  }else{
    console.error("Invalid Trip Modifier");
  }
  return result;
}

//load timetable from JSON sourcefile and build time objects based on triptype and location
loadTimetable(){
  this.http.get("../../assets/timetable.json")
      .map((res:Response) => res.json().timetable).subscribe((timetableData) => {

        //load JSON timetable into momentJS time objects
        for (const key0 of Object.keys(timetableData)){
          this.timetable[key0] = [];
          for (const key1 of Object.keys(timetableData[key0])) {

            let tmp = [];
            let morningIndex = 0; //keep track of location of first non-early morning time in array

            timetableData[key0][key1].forEach((time) => {
              let newTime = moment(time, 'HH:mm');

              if (newTime < moment('01:30', 'HH:mm')){
                //if the time is before 01:30 add it to the beginning of the time array
                //and at the end of the array but with one day added, increment index
                //in order to keep track of begining of array
                tmp.splice(morningIndex, 0, moment(newTime, 'HH:mm'));
                morningIndex++;
                tmp.push(moment(newTime,'HH:mm').add(1,'days'));
              }
              else{
                tmp.push(moment(newTime,'HH:mm'));
              }

            });

            this.timetable[key0][key1] = tmp;
          }
        }
        this.dataReady = true;

      });

    }



}
