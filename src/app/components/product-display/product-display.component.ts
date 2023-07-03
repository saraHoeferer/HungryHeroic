import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/itemModel/item.model';
import { Category } from 'src/app/models/categoryModel/category.model';
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

  constructor(private modalService: NgbModal) {}

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

}

