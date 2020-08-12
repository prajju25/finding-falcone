import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FalconeBoxComponent } from './falcone-box.component';

describe('FalconeBoxComponent', () => {
  let component: FalconeBoxComponent;
  let fixture: ComponentFixture<FalconeBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FalconeBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FalconeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
