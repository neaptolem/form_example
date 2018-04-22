import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class ProfileService {

  constructor() { }

  getData() {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      phones: ['232323232323232323', '2323232323232323232', '22323232323232323232'],
      homeAddress: {
        street: 'Ozerna',
        city: 'Vynnyky',
        state: 'Ukraine',
        zip: '79029'
      },
      workAddress: {
        street: '',
        city: '',
        state: '',
        zip: ''
      },
      color: 'rgb(255,0,255)'
    };
    return Observable.of(data).delay(1000);
  }
}
