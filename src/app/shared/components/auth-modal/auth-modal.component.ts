// auth-modal.component.ts
import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/shared/services/spotify.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent {
  constructor(private spotifyService: SpotifyService) {}

  redirectToLogin(): void {
    this.spotifyService.redirectToSpotifyAuth();
  }
}
