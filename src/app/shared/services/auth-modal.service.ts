// auth-modal.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from 'src/app/shared/components/auth-modal/auth-modal.component';

@Injectable({
  providedIn: 'root',
})
export class AuthModalService {
  constructor(private dialog: MatDialog) {}

  public showAuthModal(): void {
    this.dialog.open(AuthModalComponent, {
      width: '250px', // Set your desired width for the modal
    });
  }
}
