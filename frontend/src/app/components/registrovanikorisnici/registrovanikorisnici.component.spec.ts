import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrovanikorisniciComponent } from './registrovanikorisnici.component';

describe('RegistrovanikorisniciComponent', () => {
  let component: RegistrovanikorisniciComponent;
  let fixture: ComponentFixture<RegistrovanikorisniciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrovanikorisniciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrovanikorisniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
