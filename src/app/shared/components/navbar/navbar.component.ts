import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  search(searchTerm: string) {
    if (searchTerm.length == 0) {
      return;
    }
    this.router.navigate(['search-song', searchTerm]);
  }
}
