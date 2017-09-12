import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import  moment  from 'moment';


import 'rxjs/add/operator/map';


@Injectable()
export class TimetableProvider
{

timetable: any[];
dataReady: boolean;

  constructor(private http: Http)
  {
    console.log('Enter TimetableProvider');
    this.timetable = [];
  }

//return location names for passed tripType back to requesting page
getLocations(campus, tripType)
{
  return Object.keys(this.timetable[campus][tripType]["times"]);
}

getTripTypes(tripLocation)
{
  return this.timetable[tripLocation];
}

getTripTypeInfo(campus, tripType)
{
  return this.timetable[campus][tripType]["info"];
}

//retrieve the next 4 times for location from the timetable data
getNextTimes(type, location, time){
  let times = this.timetable[type][location];
  let queryTime = moment(time, 'HH:mm');
  let result = [];
  for(let i = 0; i<times.length; i++){
    if(times[i].isSameOrAfter(queryTime))
    {
      console.log(times[i]);
      for(let j = i; j < i+4; j++){
        result.push(times[j]);
      }
      i = times.length;
    }
  }
  return result;
}

getNextTime(campus, type, location){
  let times = this.timetable[campus][type]["times"][location];
  let now = moment();
  for(let i = 0; i<times.length; i++){
    if(times[i].isSameOrAfter(now)){
      return times[i];
    }
  }
}

findTrips(campus, tripType, origin, destination, findType, time)
{
  let departureTimes = this.timetable[campus][tripType]["times"][origin];
  let arrivalTimes = this.timetable[campus][tripType]["times"][destination];
  let result = []

  //if the trip modifier is "leaveAt"
  if(findType === "leave")
  {
    //keep track of pointers in departure & arrival schedule arrays - start at first elements
    let depIndx = 0;
    let arrIndx = 0;
      for(let resultIndx = 0; resultIndx < 5; resultIndx++)
      {

        let resultObj = {};
        //iterate through departure array starting at departure array index
        for(let dep = depIndx; dep < departureTimes.length; dep++)
        {
          //found departure time
          if(departureTimes[dep].isSameOrAfter(time))
          {
              //insert departure time
              resultObj["departure"] = departureTimes[dep];
              //update departure array index
              depIndx = dep;
              //update query time
              /* WARNING - this ignores extra stops the shuttle may make at the
              destination on its way back to the departure location */
              time = departureTimes[dep + 1]

              //find corresponding arrival time
              for(let arr = arrIndx; arr < arrivalTimes.length; arr++)
              {
                //found corresponding arrival time
                if(arrivalTimes[arr].isSameOrAfter(resultObj["departure"]))
                {
                  //insert arrival time
                  resultObj["arrival"] = arrivalTimes[arr];
                  //update arrival array index
                  arrIndx = arr;

                  //insert extra trip data
                  resultObj["duration"] = moment.duration(resultObj["arrival"].diff(resultObj["departure"]));
                  resultObj["timeToDeparture"] = moment.duration(moment().diff(resultObj["departure"]));

                  //filter out departures that preceed a departure from the same location
                  //before reaching destination (two stops at same point before destination)
                  if(resultIndx>0)
                  {
                    if(result[resultIndx-1]["arrival"].isSame(resultObj["arrival"]))
                    {
                      if(result[resultIndx-1]["duration"] > resultObj["duration"])
                      {

                        //replace previous - better trip found
                        resultIndx--;
                        result[resultIndx] = resultObj;
                        //break if infinite loop
                        if(depIndx == departureTimes.length-1 || arrIndx == arrivalTimes.length-1 )
                        {
                          resultIndx = 5;
                        }
                      }
                      else
                      {
                          //skip - prevent infinite loop
                          if(depIndx == departureTimes.length-1 || arrIndx == arrivalTimes.length-1 )
                          {
                            resultIndx = 5;
                          }
                          else
                          {
                          resultIndx--;
                          }
                      }
                    }
                    else
                    {
                      //best trip found for specified time, push and proceed
                      result.push(resultObj);
                    }
                  }
                  else
                  {
                    //always keep track of first result - may be overriden if better results are found
                    result.push(resultObj);
                  }

                  //both times have been found, break out inner for loops
                  //while perserving array indices
                  arr = arrivalTimes.length;
                  dep = departureTimes.length;
                }
              }
          }
        }
      }
      return result;
  }
  else if(findType === "arrive") //if the query requests looking by arrival time first
  {
    //keep track of pointers in departure & arrival schedule arrays - start at last elements
    let depIndx = departureTimes.length-1;
    let arrIndx = arrivalTimes.length-1;

    //keep track of the number of results
    for(let resultIndx = 0; resultIndx < 4; resultIndx++)
    {
      let resultObj = {};
      //iterate through arrival array starting at arrival array index
      for(let arr = arrIndx; arr >= 0; arr--)
      {
        //found arrival time
        if(arrivalTimes[arr].isSameOrBefore(time))
        {
          //insert arrival time
          resultObj["arrival"] = arrivalTimes[arr];
          //update arrival array index
          arrIndx = arr;
          //update query time
          time = arrivalTimes[arr-1];

          //find corresponding departure time
          for(let dep = depIndx; dep >= 0; dep--)
          {
            //found corresponding departure time
            if(departureTimes[dep].isSameOrBefore(resultObj["arrival"]))
            {
              //insert departure time
              resultObj["departure"] = departureTimes[dep];
              //update departure array index
              depIndx = dep;

              //insert extra trip data
              resultObj["duration"] = moment.duration(resultObj["arrival"].diff(resultObj["departure"]));
              resultObj["timeToDeparture"] = moment.duration(moment().diff(resultObj["departure"]));

              //push resultObj into results array
              result.push(resultObj);

              //both times have been found, break out inner for loops
              //while perserving array indices
              arr = -1;
              dep = -1;

            }
          }
        }
      }
  }
  console.log(result);
    return result;
  }
  else
  {
      console.error("Invalid Trip Modifier");
  }
}


//load timetable from JSON sourcefile and build time objects based on triptype and location
loadTimetable()
{
 return new Promise((resolve, reject) =>
{
  this.http.get("../../assets/timetable.json")
      .map((res:Response) => res.json().timetable).subscribe((timetableData) =>
      {
        //load JSON timetable into momentJS time objects
        for (const campus of Object.keys(timetableData))
        {
          this.timetable[campus] = [];
          for (const tripType of Object.keys(timetableData[campus]))
          {
              this.timetable[campus][tripType] = {};
            //enter times & and info for each campus -> triptype
              this.timetable[campus][tripType]["info"] =  timetableData[campus][tripType]["info"];
              this.timetable[campus][tripType]["times"] = {};

              for(const location of Object.keys (timetableData[campus][tripType]["times"]))
              {
                let tmp = [];
                let morningIndex = 0; //keep track of location of first non-early morning time in array

                timetableData[campus][tripType]["times"][location].forEach((time) =>
                {
                  let newTime = moment(time, 'HH:mm');

                  if (newTime < moment('01:30', 'HH:mm'))
                  {
                    //if the time is before 01:30 add it to the beginning of the time array
                    //and at the end of the array but with one day added, increment index
                    //in order to keep track of begining of array
                    tmp.splice(morningIndex, 0, moment(newTime, 'HH:mm'));
                    morningIndex++;
                    tmp.push(moment(newTime,'HH:mm').add(1,'days'));
                  }
                  else
                  {
                    tmp.push(moment(newTime,'HH:mm'));
                  }
                });
                this.timetable[campus][tripType]["times"][location] = tmp;
              }
          }
        }
        console.log("Timetable loaded");
        //everything's okay, timetable loaded
        console.log(this.timetable);
        resolve();
      },
      (error)=>
      {
        reject(Error(error));
      });
    });
  }
}
