import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledknjigaComponent } from './pregledknjiga.component';

describe('PregledknjigaComponent', () => {
  let component: PregledknjigaComponent;
  let fixture: ComponentFixture<PregledknjigaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregledknjigaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledknjigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
