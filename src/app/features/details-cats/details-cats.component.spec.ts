import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCatsComponent } from './details-cats.component';

describe('DetailsCatsComponent', () => {
  let component: DetailsCatsComponent;
  let fixture: ComponentFixture<DetailsCatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsCatsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
