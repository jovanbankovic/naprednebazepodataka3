import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdobriknjiguComponent } from './odobriknjigu.component';

describe('OdobriknjiguComponent', () => {
  let component: OdobriknjiguComponent;
  let fixture: ComponentFixture<OdobriknjiguComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdobriknjiguComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdobriknjiguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
