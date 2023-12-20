import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { emptyTrack, filledTrack } from '../../mocks/track.mock';
import { SharedModule } from '../../shared.module';
import { ListTrackComponent } from './list-track.component';
import { Track } from '../../interfaces/track.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

// Mock class for MatDialogRef
class MatDialogRefMock {
  close() {
    // Mock close method if required
  }
}

describe('ListTrackComponent', () => {
  let component: ListTrackComponent;
  let fixture: ComponentFixture<ListTrackComponent>;
  let favoriteService: FavoriteService;
  beforeEach(() => {
    const favoriteServiceStub = {
      isFavorite: jest.fn(),
      toggleFavorite: jest.fn(),
    };
    favoriteServiceStub.isFavorite.mockReturnValue(true);
    favoriteServiceStub.toggleFavorite();

    TestBed.configureTestingModule({
      declarations: [ListTrackComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: FavoriteService, useValue: favoriteServiceStub },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            message:
              'Are you sure you want to remove this track from your favorites?',
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ListTrackComponent);
    favoriteService = TestBed.inject(FavoriteService);
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

  it('should update currentTrack when playTrack is called', () => {
    const testTrack: Track = filledTrack;

    // Call playTrack with the test track
    component.playTrack(testTrack);

    // Expect currentTrack to be the test track
    expect(component.currentTrack).toEqual(testTrack);
  });

  it('should update displayedColumns based on displayArtist input', () => {
    component.displayArtist = true;
    component.ngOnChanges();
    expect(component.displayedColumns.includes('artist')).toBeTruthy();

    component.displayArtist = false;
    component.ngOnChanges();
    expect(component.displayedColumns.includes('artist')).toBeFalsy();
  });

  it('should call setupSorting in ngAfterViewInit', () => {
    const sortingSpy = jest.spyOn(component, 'setupSorting');
    component.ngAfterViewInit();
    expect(sortingSpy).toHaveBeenCalled();
  });

  // Mock MatDialog and test toggleFavorite
  it('should open a dialog and toggle favorite based on the result', () => {
    const dialogMock = TestBed.inject(MatDialog);
    component.showUnfavoriteGuard = true;
    jest.spyOn(dialogMock, 'open').mockReturnValue({
      afterClosed: () => of(true), // Simulate user confirming the action
    } as any);

    component.toggleFavorite('someSongId');
    expect(dialogMock.open).toHaveBeenCalled();
    expect(favoriteService.isFavorite).toHaveBeenCalledWith('someSongId');
  });
});
