import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajknjiguComponent } from './azurirajknjigu.component';

describe('AzurirajknjiguComponent', () => {
  let component: AzurirajknjiguComponent;
  let fixture: ComponentFixture<AzurirajknjiguComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AzurirajknjiguComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajknjiguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
