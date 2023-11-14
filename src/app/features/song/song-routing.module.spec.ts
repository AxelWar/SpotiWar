import { TestBed } from '@angular/core/testing';
import { SongRoutingModule } from './song-routing.module';

describe('SongRoutingModule', () => {
  let pipe: SongRoutingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SongRoutingModule] });
    pipe = TestBed.inject(SongRoutingModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
