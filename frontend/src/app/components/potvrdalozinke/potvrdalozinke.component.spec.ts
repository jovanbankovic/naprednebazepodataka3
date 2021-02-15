import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotvrdalozinkeComponent } from './potvrdalozinke.component';

describe('PotvrdalozinkeComponent', () => {
  let component: PotvrdalozinkeComponent;
  let fixture: ComponentFixture<PotvrdalozinkeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotvrdalozinkeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotvrdalozinkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
