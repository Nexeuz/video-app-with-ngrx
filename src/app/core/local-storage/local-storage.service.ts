import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  getItemString(key: any) {
    return localStorage.getItem(key);
  }
  stringifyItem(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  parseItem<T>(key: any) {
    return  JSON.parse(localStorage.getItem(key)) as T;
  }

  setItem(key: string, item: any) {
    localStorage.setItem(key, item);
  }

  getItemJSON(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
