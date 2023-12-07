import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchSongComponent } from './search-song.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchSongComponent', () => {
  let component: SearchSongComponent;
  let fixture: ComponentFixture<SearchSongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchSongComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
    });
    jest
      .spyOn(SearchSongComponent.prototype, 'search')
      .mockImplementation(() => {});
    fixture = TestBed.createComponent(SearchSongComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
