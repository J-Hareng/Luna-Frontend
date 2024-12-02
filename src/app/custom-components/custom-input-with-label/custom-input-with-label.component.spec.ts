import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputWithLabelComponent } from './custom-input-with-label.component';

describe('CustomInputWithLabelComponent', () => {
  let component: CustomInputWithLabelComponent;
  let fixture: ComponentFixture<CustomInputWithLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomInputWithLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomInputWithLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
