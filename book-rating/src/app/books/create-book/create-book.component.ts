import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

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
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
    // Achtung: Type Assertion ist böse!
    // Nur verwenden, wenn man ganz sicher ist, dass der Typ stimmt!
  }

}
