import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressFormComponent } from './adress-form.component';

describe('AdressFormComponent', () => {
  let component: AdressFormComponent;
  let fixture: ComponentFixture<AdressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdressFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
