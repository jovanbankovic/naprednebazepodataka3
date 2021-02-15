import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajkorisnikaComponent } from './azurirajkorisnika.component';

describe('AzurirajkorisnikaComponent', () => {
  let component: AzurirajkorisnikaComponent;
  let fixture: ComponentFixture<AzurirajkorisnikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AzurirajkorisnikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajkorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
