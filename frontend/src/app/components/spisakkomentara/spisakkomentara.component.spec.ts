import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpisakkomentaraComponent } from './spisakkomentara.component';

describe('SpisakkomentaraComponent', () => {
  let component: SpisakkomentaraComponent;
  let fixture: ComponentFixture<SpisakkomentaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpisakkomentaraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpisakkomentaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
