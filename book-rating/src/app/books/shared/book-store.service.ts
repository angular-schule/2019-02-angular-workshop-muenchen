import { Injectable, OnInit } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  constructor() { }

  // Services haben keine Lifecycle-Hooks!
  // ngOnInit() {}
  
  getAllStatic(): Book[] {
    return [
      {
        isbn: '000',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        price: 34.90,
        authors: ['Malcher', 'Hoppe'],
        rating: 5
      },
      {
        isbn: '111',
        title: 'React',
        description: 'Ein anderes Framework',
        price: 32.90,
        authors: ['Zeigermann', 'Hartmann'],
        rating: 3
      }
    ]
  }
}
