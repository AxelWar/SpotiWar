import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ArtistRoutingModule, routes } from './artist-routing.module';
import { ArtistComponent } from './artist.component';

describe('ArtistRoutingModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArtistRoutingModule, RouterTestingModule.withRoutes(routes)],
    });
  });

  it('should have route for ":id"', () => {
    const expectedRoute = {
      path: ':id',
      component: ArtistComponent,
    };

    expect(routes).toContain(expect.objectContaining(expectedRoute));
  });
});
