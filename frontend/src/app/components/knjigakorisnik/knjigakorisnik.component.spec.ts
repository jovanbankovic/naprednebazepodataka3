import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnjigakorisnikComponent } from './knjigakorisnik.component';

describe('KnjigakorisnikComponent', () => {
  let component: KnjigakorisnikComponent;
  let fixture: ComponentFixture<KnjigakorisnikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnjigakorisnikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnjigakorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
