import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SpotifyService } from '../../shared/services/spotify.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private spotifyService: SpotifyService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.spotifyService.redirectToSpotifyAuth(); // Redirect using spotifyService
        }
        return throwError(
          () => new Error('Session expired. Please log in again.')
        );
      })
    );
  }
}
