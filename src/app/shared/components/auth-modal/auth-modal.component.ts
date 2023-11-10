// auth-modal.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.extractTokenFromUrl();
    if (this.authService.validateToken()) {
      this.dialog.closeAll();
      window.location.href = '/home';
    } else {
      console.log('Token is not valid');
    }
  }

  redirectLogin(): void {
    this.authService.initLogin();
    this.dialog.closeAll();
  }
}
