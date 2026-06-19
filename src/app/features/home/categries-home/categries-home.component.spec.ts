import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategriesHomeComponent } from './categries-home.component';

describe('CategriesHomeComponent', () => {
  let component: CategriesHomeComponent;
  let fixture: ComponentFixture<CategriesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategriesHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategriesHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
