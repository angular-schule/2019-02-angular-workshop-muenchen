import { Injectable, OnInit } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private apiUrl = 'https://api.angular.schule';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> { // TODO: any ist nicht gut => konkreten Typ einsetzen
    return this.http.get<any[]>(`${this.apiUrl}/books`).pipe(
      map(rawBooks => rawBooks.map(
        rawBook => this.mapToBook(rawBook)
      )),
      catchError(err => {
        console.log('Fehler', err);
        return of(this.getAllStatic());
      })
    );
  }

  search(term: string): Observable<Book[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books/search/${term}`).pipe(
      map(rawBooks => rawBooks ? rawBooks : []),
      map(rawBooks => rawBooks.map(
        rawBook => this.mapToBook(rawBook))
      )
    );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<any>(`${this.apiUrl}/book/${isbn}`).pipe(
      map(rawBook => this.mapToBook(rawBook))
    );
  }

  private mapToBook(rawBook: any): Book {
     return {
       isbn: rawBook.isbn,
       title: rawBook.title,
       description: rawBook.description,
       price: rawBook.price,
       authors: rawBook.authors,
       firstThumbnailUrl: rawBook.firstThumbnailUrl,
       rating: rawBook.rating
     };
  }

  create(book: Book): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/book`,
      book,
      { responseType: 'text' } // weil API kein JSON liefert, sondern leeren String
    );
  }

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
