import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Book } from '../shared/book';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  @Output() create = new EventEmitter<Book>();

  bookForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
      ]),
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      price: new FormControl(null, Validators.required),
      authors: new FormArray([
        new FormControl(''),
        new FormControl('')
      ])
    });


    this.bookForm.get('isbn').valueChanges
      .subscribe(e => console.log(e));
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
    // Achtung: Type Assertion ist böse!
    // Nur verwenden, wenn man ganz sicher ist, dass der Typ stimmt!
  }

  isInvalid(name: string) {
    const control = this.bookForm.get(name);
    return control.invalid && control.dirty; // oder touched
  }

  hasError(name: string, errorCode: string) {
    const control = this.bookForm.get(name);
    return control.hasError(errorCode) && control.dirty;
  }

  submitForm() {
    // Gültigkeit prüfen
    if (this.bookForm.invalid) {
      return;
    }

    // Book erzeugen
    const newBook: Book = {
      ...this.bookForm.value,
      rating: 1
    };

    // Buch => Dashboard
    this.create.emit(newBook);


    // Reset
    this.bookForm.reset();
  }

}
