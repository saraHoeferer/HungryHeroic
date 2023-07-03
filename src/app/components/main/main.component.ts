import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app//models/itemModel/item.model';
import { Category } from 'src/app/models/categoryModel/category.model';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { ItemsService } from 'src/app/services/itemService/items.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  category?: Category[];
  items?: Item[];
  currentItem: Item = {};
  currentIndex = -1;
  title = '';

  closeResult = '';

  addItem: Item = {
    item_id: 0,
    item_name: ' ',
    item_quantity: 0,
    item_expiration_date: new Date,
    item_category_id: 0,
    item_storage_loc_id: 0,
    progress: '30',
    progressString: 'danger'
  };
  saved = false;

  constructor(
    private itemService: ItemsService,
    private categoryService: CategoryService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.retrieveItems();
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
        this.category = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
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
      item_id: this.addItem.item_id,
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
          console.log(res);
          this.saved = true;
        },
        error: (e) => console.error(e)
      });
  }

  //Set the addItem back to dummy values
  newItem(): void {
    this.saved = false;
    this.addItem = {
      item_id: 0,
      item_name: '',
      item_quantity: 0,
      item_expiration_date: new Date(),
      item_category_id: 0,
      item_storage_loc_id: 0,
      progress: '30',
      progressString: 'danger'
    };
  }





  /*Supply: Boolean;
  productDisplayList: ProductDisplay[] = [];
  productService: ProductsService = inject(ProductsService);

  constructor(){
      this.productDisplayList = this.productService.getAllProducts()
      this.Supply = true;
  }

  displaySupply() {
    this.productDisplayList = this.productService.getAllProducts()
    this.Supply = true;
  }

  displayShopping() {
    this.productDisplayList = this.productService.getAllShoppingProduct()
    this.Supply = false
  }*/
}
