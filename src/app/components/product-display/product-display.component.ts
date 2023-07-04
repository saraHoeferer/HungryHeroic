import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/itemModel/item.model';
import { Category } from 'src/app/models/categoryModel/category.model';
import { ItemsService } from 'src/app/services/itemService/items.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent {
  @Input() item!: Item;
  @Input() categories?: Category[]
  closeResult = '';
  message = '';

  currentItem: Item = {
    item_id: 0,
    item_name: '',
    item_quantity: 0,
    item_expiration_date: new Date,
    item_category_id: 0,
    item_storage_loc_id: 0,
    progress: '',
    progressString: ''
  };


  constructor(
    private itemService: ItemsService,
    private modalService: NgbModal
  ) {}

  getIcon(): string{
    if (this.categories != null){
      for (var category of this.categories){
        if (this.item.item_category_id == category.category_id){
          return category.category_icon!
        }
      }
    }
    return "fa-solid fa-xmark fa-4x"
  }

  //Open Pop-Up with Content Function
  open(content: any) {
    this.getItem(this.item.item_id!.toString()); // To display current Item Information
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

  getItem(id: string): void {
    this.itemService.get(id)
      .subscribe({
        next: (data) => {
          this.currentItem = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateItem(): void {
    this.itemService.update(this.item.item_id, this.currentItem)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Item was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteItem(): void {
    this.itemService.delete(this.item.item_id)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

}

