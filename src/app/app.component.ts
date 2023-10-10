import {Component, NgModule} from '@angular/core';

import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SpotiApp';
  constructor(http: HttpClient) {

  }
}
export class AppModule { }