import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderItemComponent } from './header-item.component';
import { SharedModule } from '../../shared.module';

describe('HeaderItemComponent', () => {
  let component: HeaderItemComponent;
  let fixture: ComponentFixture<HeaderItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [HeaderItemComponent],
    });
    fixture = TestBed.createComponent(HeaderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
