import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor() { }

  // modifier le nb d'heures en + ...
  transformDate(form: FormGroup){
    if(form.value.date_start){
      const dStart = new Date(form.value.date_start);
      const dEnd = new Date(form.value.date_end);

      dStart.setHours(dStart.getHours() + 3);
      dEnd.setHours(dEnd.getHours() + 3);

      form.value.date_start = dStart;
      form.value.date_end = dEnd;

    } else if(form.value.date){
      const dStart = new Date(form.value.date);
      dStart.setHours(dStart.getHours() + 3);

      form.value.date = dStart;
    }

    return form.value;
  }
}
