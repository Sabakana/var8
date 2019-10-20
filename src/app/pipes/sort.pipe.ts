import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  //трансформ - тело пайпа
  transform(guests: any[], searchStr: string, sortParam: string) { // параметры ,которые принимает пайп- шаблон,по которому будет выводиться строка на экран

    if (searchStr === '' && sortParam === undefined) {
      return guests;
    }

    if (sortParam !== undefined) {
      switch (sortParam) { //перебирают значения сортпарам
        case "alfavit": {
          guests = guests.sort(function (a, b) { //текущий и след элемент
            if (a.name < b.name) {
              return -1;
            } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            } else {
              return 0;
            }
          })
          break;
        }
      }
    }

    searchStr = searchStr.toLowerCase();
    return guests.filter(function (guest) {
      if (guest.name.toLowerCase().includes(searchStr) === true) {
        return true;
      } else {
        return false;
      }
    });

    // ||
    // &&
    // ===
    //   !
    //   /
    //   ==

    //   3 == '3'
    // +=
    // ++
    // --
    //   // ...
    //   // let a = 5;
    //   // let b = 10;
    //   // a = b;
    //   // b = 20;
    //   // a=
    //   //
    //   let a = [5];
    // let b = [10];
    // a = b;
    // b[0] = 20;
    // a[0]
  }
}
