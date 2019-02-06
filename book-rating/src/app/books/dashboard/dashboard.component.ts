import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[];

  constructor() {
    this.books = [
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
    ];
  }

  ngOnInit() {
  }


  updateList(book: Book) {
    this.books = this.books
      .map(b => b.isbn === book.isbn ? book : b)
      .sort((a, b) => b.rating - a.rating);
  }


  logBooks() {
    console.log(this.books);
  }

}
