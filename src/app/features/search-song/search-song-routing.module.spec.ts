import { TestBed } from '@angular/core/testing';
import { SearchSongRoutingModule } from './search-song-routing.module';

describe('SearchSongRoutingModule', () => {
  let pipe: SearchSongRoutingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SearchSongRoutingModule] });
    pipe = TestBed.inject(SearchSongRoutingModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
