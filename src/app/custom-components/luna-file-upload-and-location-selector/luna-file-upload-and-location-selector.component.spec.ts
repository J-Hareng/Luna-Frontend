import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaFileUploadAndLocationSelectorComponent } from './luna-file-upload-and-location-selector.component';

describe('LunaFileUploadAndLocationSelectorComponent', () => {
  let component: LunaFileUploadAndLocationSelectorComponent;
  let fixture: ComponentFixture<LunaFileUploadAndLocationSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunaFileUploadAndLocationSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunaFileUploadAndLocationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
