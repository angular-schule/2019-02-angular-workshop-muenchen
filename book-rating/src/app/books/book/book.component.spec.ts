import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mock, instance, verify, anything, when, spy } from 'ts-mockito';

import { BookComponent } from './book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { By } from '@angular/platform-browser';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let rs: BookRatingService;

  beforeEach(async(() => {
    // gemockten BRS erstellen
    // hat dieselbe Schnittstelle, aber keine Funktionalität
    rs = mock(BookRatingService);

    TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      providers: [
        // BRS ersetzen: Angular verwendet jetzt immer
        // instance(rs) , wenn jemand den BRS anfordert
        // instance(rs) erstellt konkrete Instanz des Mocks
        {
          provide: BookRatingService,
          useValue: instance(rs)
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;

    component.book = {
      isbn: '000',
      title: 'title',
      description: '',
      price: 10,
      authors: ['a'],
      rating: 3
    };

    // WICHTIG: Diese Zeile nach der Initialisierung des Buchs
    // damit book in der View aktualisiert wird
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should forward rateUp to the rating service', () => {
    component.rateUp();

    verify(rs.rateUp(component.book)).once();
  });

  it('should throw rate event for rateUp()', () => {
    when(rs.rateUp(anything()))
      .thenReturn({ ...component.book });

    let eventPayload;
    component.rate.subscribe(book => {
      eventPayload = book;
    });

    component.rateUp();

    expect(eventPayload).toBeTruthy();
    expect(eventPayload.title).toBe(component.book.title);
  });

  it('should invoke comp.rateUp() on button click', () => {
    const spiedComp = spy(component);

    const rateUpBtn = fixture.debugElement
      .query(By.css('[data-testing-id="rateUpBtn"]'))
      .nativeElement;

    rateUpBtn.click();

    verify(spiedComp.rateUp()).once();
  });


  it('should display the correct rating', () => {
      // Element holen und auslesen
      const ratingBox = fixture.debugElement
        .query(By.css('[data-testing-id="ratingBox"]'))
        .nativeElement;

      // in .textContent steht der Text eines DOM-Elements
      expect(ratingBox.textContent)
        .toEqual(component.book.rating.toString());
  });
});
