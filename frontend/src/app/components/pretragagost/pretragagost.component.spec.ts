import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretragagostComponent } from './pretragagost.component';

describe('PretragagostComponent', () => {
  let component: PretragagostComponent;
  let fixture: ComponentFixture<PretragagostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretragagostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretragagostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
