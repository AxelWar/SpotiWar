/* import {
  favoriteTracksReducer,
  favoritesFeatureKey,
} from './store/reducers/favorite-tracks.reducer'; */
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpotifyService } from './services/spotify.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { AuthEffects } from './store/effects/auth.effects';
import { authReducer } from './store/reducers/auth.reducer';
import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
/* import { FavoriteTracksEffects } from './store/effects/favorite-tracks.effects'; */

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      auth: authReducer,
      /*  favorites: favoriteTracksReducer, */
    }),
    EffectsModule.forRoot([
      AuthEffects,
      /*   FavoriteTracksEffects */
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [SpotifyService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
