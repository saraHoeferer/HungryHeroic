import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDisplayShoppingComponent } from './product-display-shopping.component';

describe('ProductDisplayShoppingComponent', () => {
  let component: ProductDisplayShoppingComponent;
  let fixture: ComponentFixture<ProductDisplayShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDisplayShoppingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDisplayShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
