import { Component, Input } from '@angular/core';
import { ProductDisplay } from '../product-display';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent {
  @Input() productDisplay!: ProductDisplay;
}

