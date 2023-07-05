import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/itemModel/item.model';
import { Category } from 'src/app/models/categoryModel/category.model';
import { ItemsService } from 'src/app/services/itemService/items.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { InventoryListService } from 'src/app/services/inventoryListService/inventory-list.service';
import { InventoryList } from 'src/app/models/inventoryListModel/inventory-list.model';
import { Storage } from 'src/app/models/storageModel/storage.model';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css'],
})
export class ProductDisplayComponent implements OnInit, AfterViewChecked {
  @Input() item!: Item;
  @Input() categories?: Category[]
  @Input() storages?: Storage[]
  @Input() inventoryList?: InventoryList;
  closeResult = '';
  message = '';
  currentDate = new Date()
  progress = 0

  ngOnInit(): void {
    if (this.inventoryList != null){
      this.currentInventory = this.inventoryList
    }
  }

  ngAfterViewChecked(): void {
    
  }

  currentInventory: InventoryList = {
    item_id: 0,
    user_id: 1,
    quantity: 0,
    expiration_date: new Date,
    storage_loc_id: 0,
    category_id: 0
  }

  edited = false;

  constructor(
    private itemService: ItemsService,
    private modalService: NgbModal,
    private inventoryService: InventoryListService
  ) {}

  getIcon(): string{
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

  getExpiryDays(): number{
    if (this.categories != null){
      for (var category of this.categories){
        if (this.inventoryList != undefined && this.inventoryList.category_id != undefined){
          if (this.inventoryList.category_id == category.category_id){
            return category.category_expiryDays!
          }
        } else {
          return 0
        }
      }
    }
    return 0
  }

  getDays(date?: Date){
    var date2 = new Date(date!.toString())
    if (date != null){
      if (this.currentDate.getTime() < date2.getTime()){
        var days = this.getExpiryDays()
        var date3 = new Date(date2.setDate(date2.getDate()-days))
        var difference = (+this.currentDate - +date3)/1000/60/60/24
        this.progress = 100 - difference/days * 100
      } else {
        this.progress = 101
      }
    } else {
      this.progress = 0
    }
  }

  getProgressString(): string{
    if (this.progress == 101){
      return "danger"
    } else if (this.progress > 66){
      return "success"
    } else if (this.progress > 34){
      return "warning"
    } else {
      return "danger"
    }
  }

  //Open Pop-Up with Content Function
  open(content: any) {
   // To display current Item Information
    this.modalService.open(content,
      {ariaLabelledBy: content.toString()+'Title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult =
        `Dismissed ${ProductDisplayComponent.getDismissReason(reason)}`;
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

  updateItem(): void {
    console.log(this.inventoryList)
    this.inventoryService.update(this.inventoryList?.item_id, this.inventoryList?.user_id, this.currentInventory)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Item was updated successfully!';
          this.edited = true;
        },
        error: (e) => console.error(e)
      });
  }

  deleteItem(): void {
    this.inventoryService.delete(this.inventoryList?.item_id, this.inventoryList?.user_id)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

  //Set the addItem back to dummy values
  newItem(): void {
    this.edited = false;
  }

}

