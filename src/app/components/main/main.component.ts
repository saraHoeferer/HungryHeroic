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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  categories?: Category[];
  storageLocations?: Storage[];
  inventory?: Lists[];
  shopping?: Lists[];
  supply? = true;
  category?: Category[];
  items?: Item[];
  currentItem: Item = {};
  currentIndex = -1;
  title = '';


  closeResult = '';

  addItem: Item = {
    item_name: ' ',
    item_quantity: 0,
    item_expiration_date: new Date,
    item_category_id: 0,
    item_storage_loc_id: 0,
    progress: 30,
    progressString: 'danger'
  };
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
  saveItem(): void {
    const data = {
      item_name: this.addItem.item_name,
      item_quantity: this.addItem.item_quantity,
      item_expiration_date: this.addItem.item_expiration_date,
      item_category_id: this.addItem.item_category_id,
      item_storage_loc_id: this.addItem.item_storage_loc_id,
      progress: this.addItem.progress,
      progressString: this.addItem.progressString
    };

    this.itemService.create(data)
      .subscribe({
        next: (res) => {
          this.currentItem = res
          this.saved = true;

          const data2 = {
            user_id: 1,
            item_id: this.currentItem.item_id
          }
      
          this.InventoryListService.create(data2)
            .subscribe({
              next: (res) => {
                this.currentItem = res
                this.saved = true;
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
      item_quantity: 0,
      item_expiration_date: new Date(),
      item_category_id: 0,
      item_storage_loc_id: 0,
      progress: 30,
      progressString: 'danger'
    };
  }
}
