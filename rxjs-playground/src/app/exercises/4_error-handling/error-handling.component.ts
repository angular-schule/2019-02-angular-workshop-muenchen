import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Subject, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'rxw-error-handling',
  templateUrl: './error-handling.component.html',
  styles: []
})
export class ErrorHandlingComponent implements OnInit {

  logStream$ = new Subject();

  constructor(private es: ExerciseService) { }

  ngOnInit() {
  }

  start() {
    this.es.randomError().pipe(
      catchError(err => {
        console.log('Böser Fehler passiert');
        // return throwError('Oh nein...');
        return of('Kein Fehler passiert 😇');
      })
      // retry(5)
    ).subscribe(
      value => this.logStream$.next(value),
      err => this.logStream$.next('💥 ERROR: ' + err)
    );
  }
}
