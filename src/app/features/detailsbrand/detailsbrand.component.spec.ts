import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsbrandComponent } from './detailsbrand.component';

describe('DetailsbrandComponent', () => {
  let component: DetailsbrandComponent;
  let fixture: ComponentFixture<DetailsbrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsbrandComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsbrandComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
