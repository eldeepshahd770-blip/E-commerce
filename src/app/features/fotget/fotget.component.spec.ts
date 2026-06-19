import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotgetComponent } from './fotget.component';

describe('FotgetComponent', () => {
  let component: FotgetComponent;
  let fixture: ComponentFixture<FotgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FotgetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
