import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { emptyUser } from 'src/app/shared/mocks/user.mock';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`profile has default value`, () => {
    expect(component.profile).toEqual(emptyUser);
  });

  it(`tracks has default value`, () => {
    expect(component.tracks).toEqual([]);
  });

  it(`newReleases has default value`, () => {
    expect(component.newReleases).toEqual([]);
  });

  it(`displayArtist has default value`, () => {
    expect(component.displayArtist).toEqual(true);
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(true);
  });

  it(`error has default value`, () => {
    expect(component.error).toEqual(false);
  });
});
