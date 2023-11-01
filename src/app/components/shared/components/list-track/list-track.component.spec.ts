import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrackComponent } from './list-track.component';
import { SharedModule } from '../../shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ListTrackComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: ListTrackComponent;
  let fixture: ComponentFixture<ListTrackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ListTrackComponent],
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(ListTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
