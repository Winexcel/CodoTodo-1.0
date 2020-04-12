import {Component} from '@angular/core';
import {DateService} from '../shared/services/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.sass']
})
export class SelectorComponent {

  constructor(public dateService: DateService) {

  }

  changeMonth(dir: number) {
    this.dateService.changeMonth(dir);
  }
}
