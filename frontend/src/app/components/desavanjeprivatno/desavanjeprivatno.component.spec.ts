import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesavanjeprivatnoComponent } from './desavanjeprivatno.component';

describe('DesavanjeprivatnoComponent', () => {
  let component: DesavanjeprivatnoComponent;
  let fixture: ComponentFixture<DesavanjeprivatnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesavanjeprivatnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesavanjeprivatnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
