import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMenuBarComponent } from './category-menu-bar.component';

describe('CategoryMenuBarComponent', () => {
  let component: CategoryMenuBarComponent;
  let fixture: ComponentFixture<CategoryMenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryMenuBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
