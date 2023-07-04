import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/categoryModel/category.model';
import { Item } from 'src/app/models/itemModel/item.model';
import { Lists } from 'src/app/models/Lists/lists.model';
import { ItemsService } from 'src/app/services/itemService/items.service';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { ShoppingList } from 'src/app/models/shoppingListModel/shopping-list.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnChanges {
  category?: Category[];
  items: Item[] = [];
  @Input() inventoryList?: ShoppingList[];

  constructor(private itemService: ItemsService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.retrieveCategories()
  }

  ngOnChanges(): void {
    this.retrieveItems()
  }

  retrieveCategories() {
    this.categoryService.getAll()
      .subscribe({
        next: (data) => {
          this.category = data;
        },
        error: (e) => console.error(e)
      });
  }

  retrieveItems() {
    console.log(this.inventoryList)
    if (this.inventoryList != null) {
      this.items = []
      for (let i = 0; i < this.inventoryList.length; i++) {
        this.itemService.get(this.inventoryList[i].item_id)
          .subscribe({
            next: (data) => {
              this.items[i] = data
              console.log(data)
            },
            error: (e) => console.error(e)
          })
      }
    }
  }
}
