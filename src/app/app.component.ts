import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SpotiApp';
  constructor(private store: Store) {}

  ngOnInit() {
    // By dispatching initAuth, you are starting the auth flow.
    // Make sure that this does not cause a redirect if a token exists.
    this.store.dispatch(AuthActions.initAuth());
  }
}
