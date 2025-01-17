import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaFilterSelectorComponent } from './luna-filter-selector.component';

describe('LunaFilterSelectorComponent', () => {
  let component: LunaFilterSelectorComponent;
  let fixture: ComponentFixture<LunaFilterSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunaFilterSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunaFilterSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
