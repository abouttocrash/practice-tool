import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveInputComponent } from './wave-input.component';

describe('WaveInputComponent', () => {
  let component: WaveInputComponent;
  let fixture: ComponentFixture<WaveInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaveInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaveInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
