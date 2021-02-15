import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnicicekanjeComponent } from './korisnicicekanje.component';

describe('KorisnicicekanjeComponent', () => {
  let component: KorisnicicekanjeComponent;
  let fixture: ComponentFixture<KorisnicicekanjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorisnicicekanjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnicicekanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
