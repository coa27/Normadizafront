import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Color'
})
export class ColorPipe implements PipeTransform {

  transform(value: boolean): string {
    if(value){
        return "33,197,94,.5"
    };
    return "234, 179, 10, 0.5"
  }

}
