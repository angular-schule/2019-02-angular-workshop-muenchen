import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';


@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {

  @Input() book: Book;
  @Output() rate = new EventEmitter<Book>();

  constructor(private rs: BookRatingService) { }

  ngOnInit() {
  }

  log() {
    console.log('CD');
    return '';
  }

  getStars() {
    return new Array(this.book.rating);
  }

  rateUp() {
    const ratedBook = this.rs.rateUp(this.book);
    this.rate.emit(ratedBook);
  }

  rateDown() {
    const ratedBook = this.rs.rateDown(this.book);
    this.rate.emit(ratedBook);
  }

}
