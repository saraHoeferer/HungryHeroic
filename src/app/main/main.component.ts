import { Component, inject } from '@angular/core';
import { ProductDisplay } from '../product-display';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  Supply: Boolean;
  productDisplayList: ProductDisplay[] = [];
  productService: ProductsService = inject(ProductsService);
  
  constructor(){
      this.productDisplayList = this.productService.getAllProducts()
      this.Supply = true;
  }

  displaySupply() {
    this.productDisplayList = this.productService.getAllProducts()
    this.Supply = true;
  }

  displayShopping() {
    this.productDisplayList = this.productService.getAllShoppingProduct()
    this.Supply = false
  }
}
