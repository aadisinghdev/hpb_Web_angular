import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWarningModalComponent } from './login-warning-modal.component';

describe('LoginWarningModalComponent', () => {
  let component: LoginWarningModalComponent;
  let fixture: ComponentFixture<LoginWarningModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginWarningModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWarningModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
