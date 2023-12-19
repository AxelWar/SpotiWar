import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared.module';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(() => {
    const routerStub = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: Router, useValue: routerStub }],
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should not navigate if searchTerm is empty', () => {
    component.search('');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to search-song with searchTerm when searchTerm is provided', () => {
    const searchTerm = 'testTerm';
    component.search(searchTerm);
    expect(router.navigate).toHaveBeenCalledWith(['search-song', searchTerm]);
  });
});
