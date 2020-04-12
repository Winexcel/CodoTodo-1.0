import {Component, OnInit} from '@angular/core';
import {DateService} from '../shared/services/date.service';
import {Task, TasksService} from '../shared/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  taskName = '';

  constructor(public dateService: DateService, private tasksService: TasksService) {
  }

  ngOnInit(): void {
    this.dateService.date$.subscribe(date => {
      this.tasksService.getTasksByDate(date).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
  }

  addTask() {
    if (this.taskName.trim() === '') {
      return;
    }

    const task: Task = {
      title: this.taskName,
    };
    this.tasksService.create(task, this.dateService.date$.value).subscribe(task => {
      this.tasks.push(task);
      this.taskName = '';
    });
  }

  completeTask(task: Task) {
    this.tasksService.complete(task, this.dateService.date$.value).subscribe((complete) => {
      const taskId = this.tasks.findIndex(item => item.id === task.id);
      this.tasks[taskId].complete = complete;
    });
  }


  removeTask(task: Task) {
    this.tasksService.remove(task, this.dateService.date$.value).subscribe(() => {
      this.tasks = this.tasks.filter(item => item.id !== task.id);
    });
  }
}
