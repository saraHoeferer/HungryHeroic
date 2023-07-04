import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/itemModel/item.model';
import { Category } from 'src/app/models/categoryModel/category.model';

@Component({
  selector: 'app-product-display-shopping',
  templateUrl: './product-display-shopping.component.html',
  styleUrls: ['./product-display-shopping.component.css']
})
export class ProductDisplayShoppingComponent {
  @Input() item!: Item;
  @Input() categories?: Category[];
  
  getIcon(): string{
    if (this.categories != null){
      for (var category of this.categories){
        if (this.item != undefined && this.item.item_category_id != undefined){
          if (this.item.item_category_id == category.category_id){
            return category.category_icon!
          }
       } else {
        return "fa-solid fa-xmark fa-4x"
       }
      }
    }
    return "fa-solid fa-xmark fa-4x"
  }
}
