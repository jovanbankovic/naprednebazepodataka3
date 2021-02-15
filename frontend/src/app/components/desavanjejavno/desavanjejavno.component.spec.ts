import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesavanjejavnoComponent } from './desavanjejavno.component';

describe('DesavanjejavnoComponent', () => {
  let component: DesavanjejavnoComponent;
  let fixture: ComponentFixture<DesavanjejavnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesavanjejavnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesavanjejavnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
