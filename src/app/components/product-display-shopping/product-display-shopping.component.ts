import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/itemModel/item.model';
import { Category } from 'src/app/models/categoryModel/category.model';
import { InventoryList } from 'src/app/models/inventoryListModel/inventory-list.model';
import { ShoppingList } from 'src/app/models/shoppingListModel/shopping-list.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingListService } from 'src/app/services/shoppingListService/shopping-list.service';
import { Storage } from 'src/app/models/storageModel/storage.model';
import { InventoryListService } from 'src/app/services/inventoryListService/inventory-list.service';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-product-display-shopping',
  templateUrl: './product-display-shopping.component.html',
  styleUrls: ['./product-display-shopping.component.css']
})
export class ProductDisplayShoppingComponent implements OnInit {
  // Get variables form Parent component
  @Input() item!: Item;
  @Input() categories?: Category[];
  @Input() ShoppingList?: ShoppingList;
  @Input() storageLocation?: Storage[]

  // user messages
  closeResult = '';
  message = '';

  // calculated date for adding items to inventy
  date2 = new Date().toISOString().slice(0, 10)
  // check if item is already in Inventory
  alreadyThere = false;

  // empty inventory for form
  currentInventory: InventoryList = {
    item_id: 0,
    user_id: 0,
    item_name: "",
    quantity: 0,
    expiration_date: new Date(this.date2),
    storage_loc_id: 0,
    category_id: 0
  }

  // check if user edited something / added something to inventory
  edited = false;

  // When component is loaded
  ngOnInit(): void {
    // get the estimated exipration date for each item
    this.getDate(this.ShoppingList?.category_id!)
    // fill the inventory with the current data
    this.currentInventory = {
      item_id: this.ShoppingList?.item_id,
      user_id: this.ShoppingList?.user_id,
      item_name: this.ShoppingList?.item_name,
      quantity: this.ShoppingList?.quantity,
      expiration_date: new Date(this.date2),
      storage_loc_id: 0,
      category_id: this.ShoppingList?.category_id
    }
  }

  constructor(
    private modalService: NgbModal,
    private shoppingListService: ShoppingListService,
    private inventoryListService: InventoryListService,
    public mainComponent: MainComponent
  ) { }

  // get Exipry dates of certain category
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

  // calculate the estiamted exipry Date
  getDate(id: number): void {
    var days = this.getExpiryDays(id)
    this.date2 = new Date(new Date().setDate(new Date().getDate() + days)).toISOString().slice(0, 10)
  }

  // get Icon of certain category
  getIcon(): string {
    if (this.categories != null) {
      for (var category of this.categories) {
        if (this.ShoppingList != undefined && this.ShoppingList.category_id != undefined) {
          if (this.ShoppingList.category_id == category.category_id) {
            return category.category_icon!
          }
        } else {
          return "error.png"
        }
      }
    }
    return "error.png"
  }

  //Open Pop-Up with Content Function
  open(content: any) {
    // To display current Item Information
    this.modalService.open(content,
      { ariaLabelledBy: content.toString() + 'Title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${ProductDisplayShoppingComponent.getDismissReason(reason)}`;
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

  // Edit Item in Shopping list with PK: item_id & user_id
  updateItem(): void {
    const data = {
      user_id: this.ShoppingList?.user_id,
      item_id: this.ShoppingList?.item_id,
      quantity: this.ShoppingList?.quantity,
      category_id: this.ShoppingList?.category_id,
    };
    this.shoppingListService.update(this.ShoppingList?.item_id, this.ShoppingList?.user_id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Item was updated successfully!';
          this.edited = true;
        },
        error: (e) => console.error(e)
      });
  }

  // Delete Item form Shopping List with PK: item_id & user_id
  deleteItem(): void {
    this.shoppingListService.delete(this.ShoppingList?.item_id, this.ShoppingList?.user_id)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    this.mainComponent.refreshList()
  }

  // add a ceratin item to inventory
  addToInventory() {
    let checkInventory: InventoryList[]
    if (this.currentInventory.storage_loc_id != 0) {
      // check if item is alread in inventory
      this.inventoryListService.get(this.ShoppingList!.item_id!, this.ShoppingList?.user_id!)
        .subscribe({
          next: (data) => {
            checkInventory = data
            // if so set alreadyThere true
            if (checkInventory.length != 0) {
              this.alreadyThere = true
            } else {
              // if not add it to inventory
              const data = {
                user_id: this.ShoppingList?.user_id,
                item_id: this.ShoppingList?.item_id,
                quantity: this.ShoppingList?.quantity,
                expiration_date: new Date(this.date2),
                category_id: this.ShoppingList?.category_id,
                storage_loc_id: this.currentInventory.storage_loc_id
              };
              this.inventoryListService.create(data)
                .subscribe({
                  next: (res) => {
                    console.log(res)
                    this.edited = true;
                  },
                  error: (e) => console.error(e)
                });
              this.deleteItem()
            }
          },
          error: (e) => console.error(e)
        });
      this.mainComponent.refreshList()
    }
  }

  //Set the addItem back to dummy values
  newItem(): void {
    this.edited = false;
    this.alreadyThere = false
    this.currentInventory = {
      item_id: this.ShoppingList?.item_id,
      user_id: this.ShoppingList?.user_id,
      item_name: this.ShoppingList?.item_name,
      quantity: this.ShoppingList?.quantity,
      expiration_date: new Date(this.date2),
      storage_loc_id: 0,
      category_id: this.ShoppingList?.category_id
    }
    // refreshList
    this.mainComponent.refreshList()
  }
}
