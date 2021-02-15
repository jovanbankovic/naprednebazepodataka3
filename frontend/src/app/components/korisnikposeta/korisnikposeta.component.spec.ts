import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikposetaComponent } from './korisnikposeta.component';

describe('KorisnikposetaComponent', () => {
  let component: KorisnikposetaComponent;
  let fixture: ComponentFixture<KorisnikposetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorisnikposetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikposetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
