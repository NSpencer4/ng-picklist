import { Pipe, PipeTransform } from '@angular/core';
import { PicklistData } from '../models/picklist.model';

@Pipe({ name: 'picklistFilterPipe' })
export class PicklistFilterPipe implements PipeTransform {
  transform(vals: PicklistData[], filterStr: string): PicklistData[] {
    if (filterStr) {
      return vals.filter(data => (data.id + data.name).trim().toLowerCase().indexOf(filterStr.trim().toLowerCase()) !== -1);
    } else {
      return vals;
    }
  }
}
