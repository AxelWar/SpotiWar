import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SearchSongRoutingModule } from './search-song-routing.module';
import { SearchSongComponent } from './search-song.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchSongModule } from './search-song.module';

describe('SearchSongModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, SearchSongRoutingModule, SharedModule],
      declarations: [SearchSongComponent],
      providers: [SearchSongModule],
    });
  });

  it('should create SearchSongModule', () => {
    const searchSongModule = TestBed.inject(SearchSongModule);
    expect(searchSongModule).toBeTruthy();
  });
});
