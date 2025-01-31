import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingBusinessComponent } from './landing-business.component';

describe('LandingBusinessComponent', () => {
  let component: LandingBusinessComponent;
  let fixture: ComponentFixture<LandingBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingBusinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
