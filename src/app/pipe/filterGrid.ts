import { Pipe, PipeTransform } from '@angular/core';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA LA FUCNION PIPE DE FILTRO
*/
@Pipe({
  standalone: true,
  name: 'grdFilter',
  pure: false
})

export class GrdFilterPipe implements PipeTransform {

  /**
* FUNCION DEDICADA AL FILTRO DE PARAMETRO EN CUALQUIER GRID
*/
  public transform(items: any, filter: any): any {
    if (!filter) {
      return items;
    }
    var defaultFilter: Boolean = false;


    if (!Array.isArray(items)) {
      return items;
    }

    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);

      if (defaultFilter) {
        return items.filter(item =>
          filterKeys.reduce((x, keyName) => (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
      }
      else {
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
          });
        });
      }
    }
  }
}
