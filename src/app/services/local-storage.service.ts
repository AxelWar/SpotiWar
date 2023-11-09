// local-storage.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private localStorageKey = 'favs';

  constructor() {}

  getFavorites(): Observable<string[]> {
    try {
      const favs = localStorage.getItem(this.localStorageKey);
      return of(favs ? JSON.parse(favs) : []);
    } catch (error) {
      console.error('Failed to get favorites', error);
      return of([]); // or handle error as needed
    }
  }

  // Methods to save and remove favorites...
}
