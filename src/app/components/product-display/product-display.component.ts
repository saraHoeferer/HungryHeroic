import { Component, Input } from '@angular/core';
import { ProductDisplay } from '../../product-display';
import { Item } from 'src/app/models/itemModel/item.model';
import { Category } from 'src/app/models/categoryModel/category.model';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent {
  @Input() item!: Item;
  @Input() categories?: Category[]

  getIcon(): string{
    if (this.categories != null){
      for (var category of this.categories){
        if (this.item.item_category_id == category.category_id){
          return category.category_icon!
        }
      }
    }
    return "fa-solid fa-xmark fa-4x"
  }

}

