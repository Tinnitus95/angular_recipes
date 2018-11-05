import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB7Ck8bjZkcNj65Dd5hQaOseEjSrS7Pqaw',
      authDomain: 'ng-recipe-book-ffc30.firebaseapp.com'
    });
  }


}
