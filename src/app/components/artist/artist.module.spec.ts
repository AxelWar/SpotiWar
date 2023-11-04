import { TestBed, waitForAsync } from '@angular/core/testing';
import { ArtistModule } from './artist.module';

describe('ArtistModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ArtistModule],
    }).compileComponents();
  }));

  it('should create the module', () => {
    expect(ArtistModule).toBeDefined();
  });
});
