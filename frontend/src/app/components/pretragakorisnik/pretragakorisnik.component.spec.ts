import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragakorisnikComponent } from './pretragakorisnik.component';

describe('PretragakorisnikComponent', () => {
  let component: PretragakorisnikComponent;
  let fixture: ComponentFixture<PretragakorisnikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretragakorisnikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretragakorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
