import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/map';


@Injectable()
export class TimetableProvider {

onCampus: Date[];

  constructor(private http: Http) {
    console.log('Enter TimetableProvider Provider');

}

getData() {
  return this.http.get("../../assets/timetable.json")
      .map((res:Response) => res.json().timetable);
}

}
