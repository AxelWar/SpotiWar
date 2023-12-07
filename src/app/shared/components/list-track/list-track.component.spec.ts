import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { emptyTrack } from '../../mocks/track.mock';
import { SharedModule } from '../../shared.module';
import { ListTrackComponent } from './list-track.component';

describe('ListTrackComponent', () => {
  let component: ListTrackComponent;
  let fixture: ComponentFixture<ListTrackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTrackComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ListTrackComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties set', () => {
    expect(component.trackList).toEqual([]);
    expect(component.currentTrack).toEqual(emptyTrack);
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.isMobile).toBeDefined();
    expect(component.displayedColumns).toEqual([
      'name',
      'duration',
      'preview',
      'fav',
    ]);
  });
});
