import { TestBed } from '@angular/core/testing';
import { NoImagePipe } from './no-image.pipe';

describe('NoImagePipe', () => {
  let pipe: NoImagePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [NoImagePipe] });
    pipe = TestBed.inject(NoImagePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
