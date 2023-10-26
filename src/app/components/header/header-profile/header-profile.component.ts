import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
})
export class HeaderProfileComponent {
  @Input() items: any;
  loading = false;

  constructor(private router: Router) {}
}
