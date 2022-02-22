import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCollectionsComponent } from './all-collections.component';

describe('AllCollectionsComponent', () => {
  let component: AllCollectionsComponent;
  let fixture: ComponentFixture<AllCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCollectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
