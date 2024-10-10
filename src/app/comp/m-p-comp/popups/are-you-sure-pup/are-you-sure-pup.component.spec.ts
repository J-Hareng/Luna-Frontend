import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreYouSurePupComponent } from './are-you-sure-pup.component';

describe('AreYouSurePupComponent', () => {
  let component: AreYouSurePupComponent;
  let fixture: ComponentFixture<AreYouSurePupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreYouSurePupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreYouSurePupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
