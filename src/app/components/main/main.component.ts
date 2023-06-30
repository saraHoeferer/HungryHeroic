import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app//models/itemModel/item.model';
import { Category } from 'src/app/models/categoryModel/category.model';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { ItemsService } from 'src/app/services/itemService/items.service';

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

  constructor(private itemService: ItemsService, private categoryService: CategoryService) { }

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
