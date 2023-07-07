import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from 'src/app//models/itemModel/item.model';
import { Lists } from 'src/app/models/Lists/lists.model';
import { Category } from 'src/app/models/categoryModel/category.model';
import { InventoryList } from 'src/app/models/inventoryListModel/inventory-list.model';
import { ShoppingList } from 'src/app/models/shoppingListModel/shopping-list.model';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { InventoryListService } from 'src/app/services/inventoryListService/inventory-list.service';
import { ItemsService } from 'src/app/services/itemService/items.service';
import { ShoppingListService } from 'src/app/services/shoppingListService/shopping-list.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/services/storageService/storage.service';
import { Storage } from 'src/app/models/storageModel/storage.model';
import { empty } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnChanges{
  categories?: Category[];
  storageLocations?: Storage[];
  inventory?: InventoryList[];
  shopping?: ShoppingList[];
  supply? = true;
  category?: Category[];
  items?: Item[];
  currentIndex = -1;
  title = '';
  found = false
  searchedItem?: Item[];
  needsToBeCreated = false;


  closeResult = '';

  addItem: Item = {
    item_name: '',
  };

  currentItem: Item = {
    item_id: 0,
    item_name: '',
  };
  date2 = new Date().toISOString().slice(0,10)

  addToInventory: InventoryList = {
    quantity: 0,
    user_id: 0,
    item_id: 0,
    expiration_date: new Date(this.date2), 
    storage_loc_id: 0,
    category_id: 0
  }

  addToShopping: ShoppingList ={
    user_id: 0,
    item_id: 0,
    quantity: 0,
    category_id: 0
  }

  saved = false;

  constructor(
    private itemService: ItemsService,
    private categoryService: CategoryService,
    private InventoryListService: InventoryListService,
    private ShoppingListService: ShoppingListService,
    private modalService: NgbModal,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.retrieveCategories();
    this.retrieveStorageLocations();
    this.retrieveShopping()
    this.retrieveInventory()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.retrieveCategories();
    this.retrieveStorageLocations();
    this.retrieveShopping()
    this.retrieveInventory()
  }

  retrieveInventory(): void {
    this.supply = true
    this.InventoryListService.getUserInventory(1)
    .subscribe({
      next: (data) => {
        this.inventory = data;
        for (let inventories of this.inventory){
          this.itemService.get(inventories.item_id)
            .subscribe({
              next: (data) => {
                this.currentItem = data;
                inventories.item_name = this.currentItem.item_name;
              },
              error: (e) => console.error(e)
            });
        }
      },
      error: (e) => console.error(e)
    });
  }

  sortListInventory(): void {
    this.inventory!.sort((a, b) => a.item_name!.localeCompare(b.item_name!))
  }


  retrieveShopping(): void {
    this.supply = false
    this.ShoppingListService.getUserShopping(1)
    .subscribe({
      next: (data) => {
        this.shopping = data;
        for (let shoppings of this.shopping){
          this.itemService.get(shoppings.item_id)
            .subscribe({
              next: (data) => {
                this.currentItem = data;
                shoppings.item_name = this.currentItem.item_name;
              },
              error: (e) => console.error(e)
            });
        }
      },
      error: (e) => console.error(e)
    })
  }

  refreshList(): void {
    if (this.supply){
      this.retrieveInventory()
      this.sortListInventory()
    } else {
      this.retrieveShopping()
    }
  }

  getExpiryDays(id: number): number{
    if (this.categories != null){
      for (var category of this.categories){
          if (id == category.category_id){
            return category.category_expiryDays!
          }
      }
    }
    return 0
  }


  getDate(id: number): void{
    console.log("here")
    var days = this.getExpiryDays(id)
    this.date2 = new Date(new Date().setDate(new Date().getDate() + days)).toISOString().slice(0,10)
    console.log(this.date2)
  }

  retrieveCategories(): void {
    this.categoryService.getAll()
    .subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (e) => console.error(e)
    });
  }

  retrieveStorageLocations():void{
    this.storageService.getAll()
    .subscribe({
      next: (data) => {
        this.storageLocations = data;
      },
      error: (e) => console.error(e)
    });
  }

  searchForItem():void{
    this.itemService.findByName(this.addItem.item_name)
    .subscribe ({
      next: (res) => {
        this.searchedItem = res
        console.log(this.searchedItem)
        if (this.searchedItem != null && this.searchedItem.length != 0 ){
          this.currentItem = this.searchedItem[0]
          this.found = true
        } else {
          this.needsToBeCreated = true
        }
      },
      error: (e) => console.error(e)
    });
  }

  //Open Pop-Up with Content Function
  open(content: any) {
    this.modalService.open(content,
      {ariaLabelledBy: 'popUp-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult =
        `Dismissed ${MainComponent.getDismissReason(reason)}`;
    });
  }

  //Get Dismiss Reason to close PopUp
  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Save new values from Form in addItem and create in DB
  saveInventory(): void {
    console.log(this.currentItem)
    const data = {
      user_id: 1,
      item_id: this.currentItem.item_id,
      quantity: this.addToInventory.quantity,
      expiration_date: new Date(this.date2),
      category_id: this.addToInventory.category_id,
      storage_loc_id: this.addToInventory.storage_loc_id
    };
    this.InventoryListService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res)
          this.saved = true;
        },
        error: (e) => console.error(e)
      });
  }

  saveShoppping(): void{
    console.log(this.currentItem)
    const data = {
      user_id: 1,
      item_id: this.currentItem.item_id,
      quantity: this.addToShopping.quantity,
      category_id: this.addToShopping.category_id,
    };
    this.ShoppingListService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res)
          this.saved = true;
        },
        error: (e) => console.error(e)
      });
  }

  saveItem(): void {
    const data = {
      item_name: this.addItem.item_name,
    };
    var query: Item[]
    this.itemService.create(data)
    .subscribe({
      next: (res) => {
        this.currentItem = res
        this.itemService.findByName(this.currentItem.item_name)
        .subscribe({
          next: (res) => {
            query = res
            this.currentItem = query[0]
            this.found = true
            this.needsToBeCreated = false
            console.log(this.currentItem)
          },
          error: (e) => console.error(e)
        });
        
      },
      error: (e) => console.error(e)
    });
    this.newItem()
  }

  //Set the addItem back to dummy values
  newItem(): void {
    this.saved = false;
    this.found = false;
    this.needsToBeCreated = false;
    this.addItem = {
      item_name: '',
    };
    this.addToInventory = {
      quantity: 0,
      user_id: 0,
      item_id: 0,
      expiration_date: new Date(),
      storage_loc_id: 0,
      category_id: 0
    }
    this.addToShopping ={
      user_id: 0,
      item_id: 0,
      quantity: 0,
      category_id: 0
    }
  }
}
