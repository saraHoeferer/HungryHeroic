import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/categoryModel/category.model';
import { Item } from 'src/app/models/itemModel/item.model';
import { Lists } from 'src/app/models/Lists/lists.model';
import { ItemsService } from 'src/app/services/itemService/items.service';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { ShoppingList } from 'src/app/models/shoppingListModel/shopping-list.model';
import { Storage } from 'src/app/models/storageModel/storage.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  category?: Category[];
  items: Item[] = [];
  @Input() inventoryList?: ShoppingList[];
  @Input() storages?: Storage[];

  constructor(private itemService: ItemsService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.retrieveCategories()
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
}
