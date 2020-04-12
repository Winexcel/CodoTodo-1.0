import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment',
  pure: false
})
export class MomentPipe implements PipeTransform {

  transform(value: moment.Moment, format?: string): string {
    if (!format) {
      return value.format('DD-MM-YYYY');
    }

    return value.format(format);
  }

}
