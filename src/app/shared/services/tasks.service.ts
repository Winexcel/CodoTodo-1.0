import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';


export interface Task {
  id?: string;
  title: string;
  complete?: boolean;
}

export interface TasksList {
  [date: string]: Task[];
}

export interface CreateResponse {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  constructor(private http: HttpClient) {

  }

  getTasksByDate(date?: moment.Moment): Observable<Task[]> {
    const dateFormat = date.format('DD-MM-YYYY');

    return this.http.get(`${environment.dbUrl}/tasks/${dateFormat}.json`).pipe(
      map((response, i) => {
        if (!response) {
          return [];
        }

        const list = Object.keys(response).map(key => {
          return {
            id: key,
            title: response[key].title,
            complete: response[key].complete,
          };
        });

        return list;
      })
    );
  }

  getTasksByMonth(date: moment.Moment): Observable<TasksList> {
    return this.http.get<TasksList[]>(`${environment.dbUrl}/tasks.json`).pipe(
      map(tasks => {

        const monthDate = date.clone().startOf('month');
        const resultObject: TasksList = {};
        Object.keys(tasks)
          .filter(item => monthDate.isSame(moment(item, 'DD-MM-YYYY'), 'month'))
          .forEach(item => {
            if (!Array.isArray(resultObject[item])) {
              resultObject[item] = [];
            }

            Object.keys(tasks[item]).forEach(key => {
              resultObject[item].push({
                id: key,
                ...tasks[item][key],
              });
            });
          });

        return resultObject;
      })
    );
  }

  create(task: Task, date: moment.Moment): Observable<Task> {
    return this.http.post(`${environment.dbUrl}/tasks/${date.format('DD-MM-YYYY')}.json`, task).pipe(
      map((taskId: CreateResponse) => {
        return {
          id: taskId.name,
          title: task.title,
        };
      })
    );
  }

  remove(task: Task, date: moment.Moment): Observable<any> {
    return this.http.delete(`${environment.dbUrl}/tasks/${date.format('DD-MM-YYYY')}/${task.id}.json`);
  }

  complete(task: Task, date: moment.Moment): Observable<any> {
    //debugger;
    return this.http.patch(`${environment.dbUrl}/tasks/${date.format('DD-MM-YYYY')}/${task.id}.json`, {complete: !task.complete}).pipe(
      map(value => {
        return !task.complete;
      })
    );
  }

}
