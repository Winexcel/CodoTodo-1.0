import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../shared/services/date.service';
import {TasksList, TasksService} from '../shared/services/tasks.service';

interface Day {
  date: moment.Moment;
  isActive: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  tasksCount: number;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  weeks: Week[];

  constructor(private dateService: DateService, private tasksService: TasksService) {
  }

  ngOnInit(): void {
    this.dateService.date$.subscribe(date => {
      this.tasksService.getTasksByMonth(date).subscribe(tasks => {
        this.weeks = this.generate(date, tasks);
      });
    });
  }

  generate(now: moment.Moment, tasks: TasksList) {
    const startDate = now.clone().startOf('month').startOf('week');
    const endDate = now.clone().endOf('month').endOf('week').subtract(1, 'day');
    const currentDate = startDate.clone().subtract(1, 'day');
    const weeks: Week[] = [];
    while (currentDate < endDate) {
      weeks.push({
        days: Array(7).fill(0).map(value => {
          currentDate.add(1, 'day');
          const isActive = currentDate.isSame(moment(), 'date');
          const isDisabled = !currentDate.isSame(now, 'month');
          const isSelected = now.isSame(currentDate, 'date');

          return {
            date: currentDate.clone(),
            isActive,
            isDisabled,
            isSelected,
            tasksCount: tasks[currentDate.format('DD-MM-YYYY')] ? tasks[currentDate.format('DD-MM-YYYY')].length : 0,
          };
        })
      });
    }

    return weeks;
  }

  changeDate(date: moment.Moment) {
    this.dateService.changeDate(date);
  }

}
