import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe<T extends Object> implements PipeTransform {
  transform(list: T[], field: string, direction: 'asc' | 'desc'): T[] {
    const copy = [...list];


    const result = copy.sort((a, b) => {
      if (direction === 'asc') {
        //@ts-ignore
        return a[field] > b[field] ? 1 : -1;
      }
      if (direction === 'desc') {
        //@ts-ignore
        return a[field] > b[field] ? -1 : 1;
      }

      return 0;
    });
    console.log(result);
    return result;
  }
}
