import { BookRatingService } from './book-rating.service';
import { Book } from './book';

describe('BookRatingService', () => {

  let book: Book;
  let service: BookRatingService;
  // Arrange
  beforeEach(() => {
    service = new BookRatingService();
    book = {
      isbn: '000',
      title: 'title',
      description: '',
      price: 10,
      authors: ['a'],
      rating: 3
    };
  });

  it('should rate up the book by one', () => {    
    // Act
    const ratedBook = service.rateUp(book);

    // Assert
    expect(ratedBook.rating).toBe(4);
  });

  it('should rate down the book by one', () => {
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not have a rating greater than 5', () => {
    book.rating = 5;
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });
  
  it('should not have a rating less than 1', () => {
    book.rating = 1;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(1);
  });
  
  it('should always return a new book', () => {
    const ratedBook = service.rateUp(book);
    expect(ratedBook).not.toBe(book);
  });
});
