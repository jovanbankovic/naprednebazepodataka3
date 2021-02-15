import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnjigagostComponent } from './knjigagost.component';

describe('KnjigagostComponent', () => {
  let component: KnjigagostComponent;
  let fixture: ComponentFixture<KnjigagostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnjigagostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnjigagostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
