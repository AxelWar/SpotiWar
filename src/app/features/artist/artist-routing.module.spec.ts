import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ArtistComponent } from './artist.component';
import { ArtistRoutingModule } from './artist-routing.module';

describe('ArtistRoutingModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: ':id', component: ArtistComponent },
        ]),
        ArtistRoutingModule,
      ],
      declarations: [ArtistComponent],
    }).compileComponents();
  });

  it('should create the ArtistRoutingModule', () => {
    const routingModule = TestBed.inject(ArtistRoutingModule);
    expect(routingModule).toBeTruthy();
  });
});
