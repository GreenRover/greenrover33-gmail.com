import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectValues'
})
export class ObjectValuesPipe implements PipeTransform {
  transform<T>(object: { [key: string]: T }): Array<T> {
    return Object.values(object);
  }
}
