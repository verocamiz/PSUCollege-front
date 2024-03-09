import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TBD'
})
export class TBDPipe implements PipeTransform{
    transform(text: string) : string {
        if(text == null || text.length == 0){
          return 'TBD';
        }
        return text;
    }
}
