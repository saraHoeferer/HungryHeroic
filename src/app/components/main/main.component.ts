import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from 'src/app//models/itemModel/item.model';
import { Category } from 'src/app/models/categoryModel/category.model';
import { InventoryList } from 'src/app/models/inventoryListModel/inventory-list.model';
import { ShoppingList } from 'src/app/models/shoppingListModel/shopping-list.model';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { InventoryListService } from 'src/app/services/inventoryListService/inventory-list.service';
import { ItemsService } from 'src/app/services/itemService/items.service';
import { ShoppingListService } from 'src/app/services/shoppingListService/shopping-list.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/services/storageService/storage.service';
import { Storage } from 'src/app/models/storageModel/storage.model';
import { AppComponent } from "../../app.component";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authService/auth.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, OnChanges {
  constructor(
    private itemService: ItemsService,
    private categoryService: CategoryService,
    private InventoryListService: InventoryListService,
    private ShoppingListService: ShoppingListService,
    private modalService: NgbModal,
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private appComponent: AppComponent
  ) { }

  // current User
  currentUser: any;
  // list of all categories
  categories?: Category[];
  // list of all storageLocations
  storageLocations?: Storage[];
  // list of user inventory to display
  inventory?: InventoryList[];
  // list of user shopping to display
  shopping?: ShoppingList[];
  // to check if supply or shopping
  supply?= true;
  // list of items
  items?: Item[];
  // to check if something was found in search
  found = false
  // the searchedFor Item
  searchedItem?: Item[];
  // to check if item needs to be created
  needsToBeCreated = false;
  // check logged in
  isLoggedIn = false;
  // check if item filterd / searched for is in list
  noInList = false;
  // user variables
  user_name?: string;
  eventBusSub?: Subscription;
  // users fixed inventory
  fixedInventory?: InventoryList[];
  // users fixed shopping
  fixedShopping?: ShoppingList[];
  // check if user searched for something
  searched = false;
  // check if item is already in list
  alreadyThere = false

  closeResult = '';

  // default form variables
  addItem: Item = {
    item_name: '',
  };

  searchItem: Item = {
    item_name: '',
  }

  currentItem: Item = {
    item_id: 0,
    item_name: '',
  };

  date2 = new Date().toISOString().slice(0, 10)

  addToInventory: InventoryList = {
    quantity: 0,
    user_id: this.appComponent.userId,
    item_id: 0,
    expiration_date: new Date(this.date2),
    storage_loc_id: 0,
    category_id: 0
  }

  addToShopping: ShoppingList = {
    user_id: this.appComponent.userId,
    item_id: 0,
    quantity: 0,
    category_id: 0
  }

  // check if user saved something
  saved = false;

  // When the component is first loaded
  ngOnInit(): void {
    this.retrieveCategories();
    this.retrieveStorageLocations();
    this.retrieveShopping()
    this.retrieveInventory()
    this.appComponent.setIsHome(false)
    this.currentUser = this.storageService.getUser();
  }

  // reload variable if there is a change in the component
  ngOnChanges(changes: SimpleChanges): void {
    this.retrieveCategories();
    this.retrieveStorageLocations();
    this.retrieveShopping()
    this.retrieveInventory()
  }

  // retrieve all categories
  retrieveCategories(): void {
    this.categoryService.getAll()
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (e) => console.error(e)
      });
  }

  // retrieve all StorageLocations
  retrieveStorageLocations(): void {
    this.storageService.getAll()
      .subscribe({
        next: (data) => {
          this.storageLocations = data;
        },
        error: (e) => console.error(e)
      });
  }

  // retrieve the users inventory
  async retrieveInventory(): Promise<void> {
    this.searched = false
    this.supply = true
    this.noInList = false
    this.fixedInventory = await this.InventoryListService.getUserInventory(this.appComponent.userId)
    if (this.fixedInventory != null) {
      for (let inventories of this.fixedInventory) {
        this.currentItem = await this.itemService.get(inventories.item_id)
        inventories.item_name = this.currentItem.item_name
      }
    }
    this.fixedInventory!.sort((a, b) => a.item_name!.localeCompare(b.item_name!))
    this.inventory = this.fixedInventory
  }

  // retrieve the users shopping
  async retrieveShopping(): Promise<void> {
    this.supply = false
    this.searched = false
    this.noInList = false
    this.fixedShopping = await this.ShoppingListService.getUserShopping(this.appComponent.userId)
    if (this.fixedShopping != null) {
      for (let shoppings of this.fixedShopping) {
        this.currentItem = await this.itemService.get(shoppings.item_id)
        shoppings.item_name = this.currentItem.item_name
      }
    }
    this.fixedShopping!.sort((a, b) => a.item_name!.localeCompare(b.item_name!))
    this.shopping = this.fixedShopping
  }

  // sort the inventory list arcording to a ceratin criteria
  sortListInventory(sorting: string): void {
    let clear = true
    if (this.inventory != undefined && this.inventory != null) {
      for (let inventories of this.inventory) {
        if (inventories.item_name == undefined) {
          clear = false
        }
      }
      if (clear) {
        if (sorting == "asc") {
          this.inventory!.sort((a, b) => a.item_name!.localeCompare(b.item_name!))
        } else if (sorting == "desc") {
          this.inventory!.sort((a, b) => a.item_name!.localeCompare(b.item_name!)).reverse()
        } else if (sorting == "ascDate") {
          this.inventory!.sort((a, b) => a.expiration_date!.toString()!.localeCompare(b.expiration_date!.toString()))
        } else if (sorting == "descDate") {
          this.inventory!.sort((a, b) => a.expiration_date!.toString()!.localeCompare(b.expiration_date!.toString())).reverse()
        } else {
          this.inventory!.sort((a, b) => a.item_name!.localeCompare(b.item_name!))
        }
      }
    }
  }

  // sort the shopping list arcording to a ceratin criteria
  sortListShopping(sorting: string): void {
    let clear = true
    if (this.shopping != undefined && this.shopping != null) {
      for (let shoppings of this.shopping) {
        if (shoppings.item_name == undefined) {
          clear = false
        }
      }
      if (clear) {
        if (sorting == "asc") {
          this.shopping!.sort((a, b) => a.item_name!.localeCompare(b.item_name!))
        } else if (sorting == "desc") {
          this.shopping!.sort((a, b) => a.item_name!.localeCompare(b.item_name!)).reverse()
        } else {
          this.shopping!.sort((a, b) => a.item_name!.localeCompare(b.item_name!))
        }
      }
    }
  }

  // filter the Inventory list according to a certain criteria
  filterInventoryList(type: string, id?: number): void {
    this.noInList = false
    let inventoryList: InventoryList[] = [];
    if (type == "category") {
      if (this.fixedInventory != null && id != null) {
        for (let inventory of this.fixedInventory) {
          if (inventory.category_id == id) {
            inventoryList.push(inventory)
          }
        }
      }
    } else if (type == "storage") {
      if (this.fixedInventory != null && id != null) {
        for (let inventory of this.fixedInventory) {
          if (inventory.storage_loc_id == id) {
            inventoryList.push(inventory)
          }
        }
      }
    }
    if (inventoryList.length != 0) {
      this.inventory = inventoryList
    } else {
      this.noInList = true
      this.inventory = []
    }
  }

  // filter the shoping list according to a certain criteria
  filterShoppingList(id?: number): void {
    this.noInList = false
    let shoppingList: ShoppingList[] = [];

    if (this.fixedShopping != null && id != null) {
      for (let shopping of this.fixedShopping) {
        if (shopping.category_id == id) {
          shoppingList.push(shopping)
        }
      }
    }

    if (shoppingList.length != 0) {
      this.shopping = shoppingList
    } else {
      this.noInList = true
      this.shopping = []
    }
  }

  // refresh the lists
  refreshList(): void {
    console.log("in Funktion")
    if (this.supply) {
      console.log("in Supply")
      this.retrieveInventory()
    } else {
      console.log("in Shopping")
      this.retrieveShopping()
    }
  }

  // get exipry days of a certain category
  getExpiryDays(id: number): number {
    if (this.categories != null) {
      for (var category of this.categories) {
        if (id == category.category_id) {
          return category.category_expiryDays!
        }
      }
    }
    return 0
  }

  // search for a similiar item when user uses searchbar
  searchForSimilarItem() {
    this.noInList = false
    if (this.searchItem.item_name != '') {
      this.searched = true
      let inventoryList: InventoryList[] = [];
      let shoppingList: ShoppingList[] = [];
      // search for certain item
      this.itemService.findSimilarByName(this.searchItem.item_name)
        .subscribe({
          next: (data) => {
            this.items = data;
            // if supply and found push it to inventory
            if (this.supply) {
              if (this.items != null && this.fixedInventory != null) {
                for (let item of this.items) {
                  for (let inventories of this.fixedInventory) {
                    if (item.item_id == inventories.item_id) {
                      inventoryList.push(inventories)
                    }
                  }
                }
              }
              // eiter it displays nothing or the items searched for
              if (inventoryList.length != 0) {
                this.inventory = inventoryList
              } else {
                this.inventory = []
              }
              console.log(inventoryList)
            } else {
              // if in shopping to the same thing with the shopping list
              if (this.items != null && this.fixedShopping != null) {
                for (let item of this.items) {
                  for (let shopping of this.fixedShopping) {
                    if (item.item_id == shopping.item_id) {
                      shoppingList.push(shopping)
                    }
                  }
                }
              }
              if (shoppingList.length != 0) {
                this.shopping = shoppingList
              } else {
                this.shopping = []
              }
              console.log(this.shopping)
            }
          },
          error: (e) => console.error(e)
        });
    } else {
      // if input is empty set list to default
      if (this.supply) {
        this.inventory = this.fixedInventory
      } else {
        this.shopping = this.fixedShopping
      }
    }
  }

  // get estimated expiration date for forms
  getDate(id: number): void {
    var days = this.getExpiryDays(id)
    this.date2 = new Date(new Date().setDate(new Date().getDate() + days)).toISOString().slice(0, 10)
    console.log(this.date2)
  }

  // search for a particular item when user adds items to liost
  searchForItem(): void {
    let checkShopping: ShoppingList[];
    let checkInventory: InventoryList[];
    // serach for item
    this.itemService.findByName(this.addItem.item_name)
      .subscribe({
        next: (res) => {
          this.searchedItem = res
          console.log(this.searchedItem)
          // if found check both list if item is already in there or not
          if (this.searchedItem != null && this.searchedItem.length != 0) {
            this.currentItem = this.searchedItem[0]
            this.found = true
            if (this.supply) {
              this.InventoryListService.get(this.currentItem.item_id!, this.appComponent.userId!)
                .subscribe({
                  next: (data) => {
                    checkInventory = data
                    if (checkInventory.length != 0) {
                      this.alreadyThere = true
                    }
                  },
                  error: (e) => console.error(e)
                });
            } else {
              this.ShoppingListService.get(this.currentItem.item_id!, this.appComponent.userId!)
                .subscribe({
                  next: (data) => {
                    checkShopping = data
                    if (checkShopping.length != 0) {
                      this.alreadyThere = true
                    }
                  },
                  error: (e) => console.error(e)
                });
            }
          } else {
            // if not found create it
            this.saveItem()
          }
        },
        error: (e) => console.error(e)
      });
  }

  //Open Pop-Up with Content
  open(content: any) {
    this.modalService.open(content,
      { ariaLabelledBy: 'popUp-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${MainComponent.getDismissReason(reason)}`;
      });
  }

  // Get Dismiss Reason to close PopUp
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
    if (this.addToInventory.quantity != 0 && this.addToInventory.category_id != 0 && this.addToInventory.storage_loc_id != 0) {
      const data = {
        user_id: this.addToInventory.user_id,
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
  }

  // save users Shopping entry
  saveShopping(): void {
    if (this.addToShopping.quantity != 0 && this.addToShopping.category_id != 0) {
      const data = {
        user_id: this.addToShopping.user_id,
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
  }

  // Add a new Item to the Database
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
    this.alreadyThere = false
    this.saved = false;
    this.found = false;
    this.needsToBeCreated = false;
    this.addItem = {
      item_name: '',
    };
    this.addToInventory = {
      quantity: 0,
      user_id: this.appComponent.userId,
      item_id: 0,
      expiration_date: new Date(),
      storage_loc_id: 0,
      category_id: 0
    }
    this.addToShopping = {
      user_id: this.appComponent.userId,
      item_id: 0,
      quantity: 0,
      category_id: 0
    }
  }
}
