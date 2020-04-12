import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  date$: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment());

  changeMonth(dir: number) {
    this.date$.next(this.date$.value.add(dir, 'month'));
  }

  changeDate(date: moment.Moment) {
    this.date$.next(date);
  }

}
