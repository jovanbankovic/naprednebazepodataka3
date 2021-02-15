import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesavanjagostComponent } from './desavanjagost.component';

describe('DesavanjagostComponent', () => {
  let component: DesavanjagostComponent;
  let fixture: ComponentFixture<DesavanjagostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesavanjagostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesavanjagostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
