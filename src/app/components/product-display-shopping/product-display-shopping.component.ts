import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/itemModel/item.model';
import { Category } from 'src/app/models/categoryModel/category.model';
import { InventoryList } from 'src/app/models/inventoryListModel/inventory-list.model';
import { ItemsService } from 'src/app/services/itemService/items.service';

@Component({
  selector: 'app-product-display-shopping',
  templateUrl: './product-display-shopping.component.html',
  styleUrls: ['./product-display-shopping.component.css']
})
export class ProductDisplayShoppingComponent implements OnInit{
  @Input() item!: Item;
  @Input() categories?: Category[];
  @Input() inventoryList?: InventoryList;
  ngOnInit(): void {
    if (this.inventoryList != null){
      this.getItem(this.inventoryList.item_id!.toString())
    }
  }
  constructor(
    private itemService: ItemsService,
  ) {}

  getIcon(): string{
    console.log(this.inventoryList)
    if (this.categories != null){
      for (var category of this.categories){
        if (this.inventoryList != undefined && this.inventoryList.category_id != undefined){
          if (this.inventoryList.category_id == category.category_id){
            return category.category_icon!
          }
       } else {
        return "fa-solid fa-xmark fa-4x"
       }
      }
    }
    return "fa-solid fa-xmark fa-4x"
  }

  getItem(id: string): void {
    this.itemService.get(id)
      .subscribe({
        next: (data) => {
          this.item = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
