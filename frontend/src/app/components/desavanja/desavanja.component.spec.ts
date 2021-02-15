import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesavanjaComponent } from './desavanja.component';

describe('DesavanjaComponent', () => {
  let component: DesavanjaComponent;
  let fixture: ComponentFixture<DesavanjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesavanjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesavanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
