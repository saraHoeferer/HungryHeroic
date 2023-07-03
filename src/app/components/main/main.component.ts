import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app//models/itemModel/item.model';
import { Lists } from 'src/app/models/Lists/lists.model';
import { Category } from 'src/app/models/categoryModel/category.model';
import { InventoryList } from 'src/app/models/inventoryListModel/inventory-list.model';
import { ShoppingList } from 'src/app/models/shoppingListModel/shopping-list.model';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { InventoryListService } from 'src/app/services/inventoryListService/inventory-list.service';
import { ItemsService } from 'src/app/services/itemService/items.service';
import { ShoppingListService } from 'src/app/services/shoppingListService/shopping-list.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  inventory?: Lists[];
  shopping?: Lists[];
  supply? = true;

  constructor(private InventoryListService: InventoryListService, private ShoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.retrieveShopping()
    this.retrieveInventory()
  }

  retrieveInventory(): void {
    this.supply = true
    this.InventoryListService.getUserInventory(2)
    .subscribe({
      next: (data) => {
        this.inventory = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  retrieveShopping(): void {
    this.supply = false
    this.ShoppingListService.getUserShopping(2)
    .subscribe({
      next: (data) => {
        this.shopping = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    })
  }
}
