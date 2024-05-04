import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorhighlightComponent } from './colorhighlight.component';

describe('ColorhighlightComponent', () => {
  let component: ColorhighlightComponent;
  let fixture: ComponentFixture<ColorhighlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorhighlightComponent]
    });
    fixture = TestBed.createComponent(ColorhighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
