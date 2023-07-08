import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/itemModel/item.model';
import { Category } from 'src/app/models/categoryModel/category.model';
import { InventoryList } from 'src/app/models/inventoryListModel/inventory-list.model';
import { ItemsService } from 'src/app/services/itemService/items.service';
import { ShoppingList } from 'src/app/models/shoppingListModel/shopping-list.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingListService } from 'src/app/services/shoppingListService/shopping-list.service';
import { Storage } from 'src/app/models/storageModel/storage.model';
import { InventoryListService } from 'src/app/services/inventoryListService/inventory-list.service';

@Component({
  selector: 'app-product-display-shopping',
  templateUrl: './product-display-shopping.component.html',
  styleUrls: ['./product-display-shopping.component.css']
})
export class ProductDisplayShoppingComponent implements OnInit {
  @Input() item!: Item;
  @Input() categories?: Category[];
  @Input() ShoppingList?: ShoppingList;
  @Input() storageLocation?: Storage[]
  @Input() ShoppingLists?: ShoppingList[];
  closeResult = '';
  message = '';
  date2 = new Date().toISOString().slice(0, 10)
  alreadyThere = false;

  currentInventory: InventoryList = {
    item_id: 0,
    user_id: 1,
    quantity: 0,
    expiration_date: new Date(this.date2),
    storage_loc_id: 0,
    category_id: 0
  }

  edited = false;

  ngOnInit(): void {

  }

  constructor(
    private itemService: ItemsService,
    private modalService: NgbModal,
    private shoppingListService: ShoppingListService,
    private inventoryListService: InventoryListService
  ) { }

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


  getDate(id: number): void {
    var days = this.getExpiryDays(id)
    this.date2 = new Date(new Date().setDate(new Date().getDate() + days)).toISOString().slice(0, 10)
  }

  getIcon(): string {
    if (this.categories != null) {
      for (var category of this.categories) {
        if (this.ShoppingList != undefined && this.ShoppingList.category_id != undefined) {
          if (this.ShoppingList.category_id == category.category_id) {
            return category.category_icon!
          }
        } else {
          return "fa-solid fa-xmark fa-4x"
        }
      }
    }
    return "fa-solid fa-xmark fa-4x"
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

  deleteItem(): void {
    this.shoppingListService.delete(this.ShoppingList?.item_id, this.ShoppingList?.user_id)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    this.ShoppingLists!.forEach((item, index) => {
      if (item === this.ShoppingList) this.ShoppingLists!.splice(index, 1);
    });
  }

  addToInventory() {
    let checkInventory: InventoryList[]
    if (this.currentInventory.storage_loc_id != 0) {
      this.inventoryListService.get(this.ShoppingList!.item_id!, 1)
        .subscribe({
          next: (data) => {
            checkInventory = data
            if (checkInventory.length != 0) {
              this.alreadyThere = true
            } else {
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
              this.ShoppingLists!.forEach((item, index) => {
                if (item === this.ShoppingList) this.ShoppingLists!.splice(index, 1);
              });
            }
          },
          error: (e) => console.error(e)
        });
    }
  }

  //Set the addItem back to dummy values
  newItem(): void {
    this.edited = false;
    this.alreadyThere = false
  }
}
