import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

describe('HomeRoutingModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: HomeComponent },
        ]),
        HomeRoutingModule,
      ],
      declarations: [HomeComponent],
    }).compileComponents();
  });

  it('should create the HomeRoutingModule', () => {
    const routingModule = TestBed.inject(HomeRoutingModule);
    expect(routingModule).toBeTruthy();
  });
});
