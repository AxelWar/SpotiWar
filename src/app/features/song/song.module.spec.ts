import { TestBed } from '@angular/core/testing';
import { SongModule } from './song.module';

describe('SongModule', () => {
  let pipe: SongModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SongModule] });
    pipe = TestBed.inject(SongModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
