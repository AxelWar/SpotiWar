import { TestBed, waitForAsync } from '@angular/core/testing';
import { HomeModule } from './home.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('HomeModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, HomeRoutingModule],
      declarations: [HomeComponent],
      providers: [HomeModule],
    }).compileComponents();
  }));

  it('should create Home module', () => {
    const homeModule = TestBed.inject(HomeModule);
    expect(homeModule).toBeTruthy();
  });
});
