import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerDataService {
  constructor() {}

  opaqueSpinner() {
    return {
      color: '#4562F2',
      bdColor: '#292B41',
    };
  }
  spinner() {
    return {
      color: '#4562F2',
    };
  }
}
