import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikpretragaComponent } from './korisnikpretraga.component';

describe('KorisnikpretragaComponent', () => {
  let component: KorisnikpretragaComponent;
  let fixture: ComponentFixture<KorisnikpretragaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorisnikpretragaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikpretragaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
