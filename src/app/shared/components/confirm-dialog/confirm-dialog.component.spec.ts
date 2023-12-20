import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Mock class for MatDialogRef
class MatDialogRefMock {
  close() {
    // Mock close method if required
  }
}

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [SharedModule],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            message:
              'Are you sure you want to remove this track from your favorites?',
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with false on no click', () => {
    const dialogRefSpy = jest.spyOn(component.dialogRef, 'close');
    component.onNoClick();
    expect(dialogRefSpy).toHaveBeenCalledWith(false);
  });

  it('should close the dialog with true on yes click', () => {
    const dialogRefSpy = jest.spyOn(component.dialogRef, 'close');
    component.onYesClick();
    expect(dialogRefSpy).toHaveBeenCalledWith(true);
  });

  it('should have the correct message data', () => {
    expect(component.data.message).toBe(
      'Are you sure you want to remove this track from your favorites?'
    );
  });
});
