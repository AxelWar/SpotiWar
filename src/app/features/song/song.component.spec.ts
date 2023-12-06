import { ComponentFixture, TestBed } from '@angular/core/testing';
import { emptyAlbum } from 'src/app/shared/mocks/album.mock';
import { SongComponent } from './song.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('SongComponent', () => {
  let component: SongComponent;
  let fixture: ComponentFixture<SongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SongComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
    });
    jest.spyOn(SongComponent.prototype, 'getAlbum')
      .mockImplementation(() => {});
    fixture = TestBed.createComponent(SongComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  it(`album has default value`, () => {
    expect(component.album).toEqual(emptyAlbum);
  });
});
