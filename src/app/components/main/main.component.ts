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
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/services/storageService/storage.service';
import { Storage } from 'src/app/models/storageModel/storage.model';
import { empty } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  categories?: Category[];
  storageLocations?: Storage[];
  inventory?: InventoryList[];
  shopping?: ShoppingList[];
  supply? = true;
  category?: Category[];
  items?: Item[];
  currentItem: Item = {};
  currentIndex = -1;
  title = '';
  found = false
  searchedItem?: Item[];
  needsToBeCreated = false;


  closeResult = '';

  addItem: Item = {
    item_name: '',
    progress: 30,
    progressString: 'danger'
  };

  addToInventory: InventoryList = {
    quantity: 0,
    user_id: 0,
    item_id: 0,
    expiration_date: new Date,
    storage_loc_id: 0,
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
    this.retrieveItems();
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
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  retrieveItems(): void {
    this.itemService.getAll()
      .subscribe({
        next: (data) => {
          this.items = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    this.categoryService.getAll()
    .subscribe({
      next: (data) => {
        this.categories = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  retrieveShopping(): void {
    this.supply = false
    this.ShoppingListService.getUserShopping(1)
    .subscribe({
      next: (data) => {
        this.shopping = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    })
  }
  refreshList(): void {
    this.retrieveItems();
    this.currentItem = {};
    this.currentIndex = -1;
  }

  setActiveItem(item: Item, index: number): void {
    this.currentItem = item;
    this.currentIndex = index;
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

  removeAllItems(): void {
    this.itemService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentItem = {};
    this.currentIndex = -1;

    this.itemService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.items = data;
          console.log(data);
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
      expiration_date: this.addToInventory.expiration_date,
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

  saveItem(): void {
    const data = {
      item_name: this.addItem.item_name,
      progress: 20,
      progressString: "danger"
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
  }

  //Set the addItem back to dummy values
  newItem(): void {
    this.saved = false;
    this.addItem = {
      item_name: '',
      progress: 30,
      progressString: 'danger'
    };
  }
}
