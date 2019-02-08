import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'br-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Book Rating!';

  ngOnInit() {


    const myObserver = {
      next: value => console.log(value),
      error: err => console.error('ERR', err),
      complete: () => console.log('Complete')
    };


    const myObs = new Observable(observer => {
      setTimeout(() => observer.next('A'), 2000);

      observer.next('B');
      observer.next('C');

      setTimeout(() => observer.complete(), 3000);
      setTimeout(() => {
        observer.next('HALLO');
        console.log('???');
      }, 4000);
    });

    const sub = myObs.subscribe(myObserver);

    setTimeout(() => sub.unsubscribe(), 1000);


    


    


    function observable(observer) {
      setTimeout(() => observer.next('A'), 2000);

      observer.next('B');
      observer.next('C');

      setTimeout(() => observer.complete(), 3000);
      setTimeout(() => observer.next('HALLO'), 4000);

    }


   //  observable(myObserver);






  }
}
