import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/actions/auth.actions';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SpotiApp';
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.initAuth());
  }
}
