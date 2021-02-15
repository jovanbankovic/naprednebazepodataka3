import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaboravljenasifraComponent } from './zaboravljenasifra.component';

describe('ZaboravljenasifraComponent', () => {
  let component: ZaboravljenasifraComponent;
  let fixture: ComponentFixture<ZaboravljenasifraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaboravljenasifraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaboravljenasifraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
